from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['SECRET_KEY'] = 'randomstring'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:tiger@mysqldb/assignment'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
 
db = SQLAlchemy(app)
#mysqld --default-authentication-plugin=mysql_native_password
#ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'tiger';

#our model

class Trainer(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100), unique = True)
    full_name = db.Column(db.String(100))
    # date_created = db.Column(db.DateTime, default=datetime.now)
 
    def __init__(self, username, full_name):
        self.username = username
        self.full_name = full_name

class Course(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), unique = True)
    code = db.Column(db.String(100), unique = True)
    state = db.Column(db.String(20))
    publishedId = db.Column(db.Integer)

    def __init__(self, name, code, state="Draft", published_id=None):
        self.name = name
        self.code = code
        self.state = state
        self.publishedId = published_id
    
    def serialize(self):
        return {
            'name': self.name, 
            'code': self.code,
            'state': self.state,
            'published_id': self.publishedId
        }

class Module(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), unique = True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'))
    state = db.Column(db.String(20))
    publishedId = db.Column(db.Integer)

    def __init__(self, name, course_id, state="Draft", published_id=None):
        self.name = name
        self.course_id = course_id
        self.state = state
        self.publishedId = published_id
    
    def serialize(self):
        return {
            'name': self.name, 
            'course_id': self.course_id,
            'state': self.state,
            'published_id': self.publishedId
        }

class Topic(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), unique = True)
    module_id = db.Column(db.Integer, db.ForeignKey('module.id') )
    description = db.Column(db.String(200))
    state = db.Column(db.String(20))
    publishedId = db.Column(db.Integer)

    def __init__(self, name, module_id, description, state="Draft", published_id=None):
        self.name = name
        self.module_id = module_id
        self.description = description
        self.state = state
        self.publishedId = published_id

    def serialize(self):
        return {
            'name': self.name, 
            'module_id': self.module_id,
            'description': self.description,
            'state': self.state,
            'published_id': self.publishedId
        }

@app.route('/')
def hello():
    return "Welcome to the training Portal"

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/add-trainer', methods=['POST'])
def addTrainer():
    username = request.values.get('username')
    full_name = request.values.get('full_name')
    trainer = Trainer(username, full_name)
    addToDB(trainer)
    return "Added new trainer successfully!"

@app.route('/add-course', methods=['POST'])
def addCourse():
    name = request.values.get('name')
    code = request.values.get('code')
    course = Course(name, code, "Published")
    addToDB(course)
    return "Added new course successfully!"

@app.route('/add-module', methods=['POST'])
def addModule():
    name = request.values.get('name')
    course_id = request.values.get('course_id')
    module = Module(name, course_id, "Published")
    addToDB(module)
    return "Added new module successfully!"

@app.route('/add-topic', methods=['POST'])
def addTopic():
    name = request.values.get('name')
    module_id = request.values.get('module_id')
    description = request.values.get('description')
    topic = Topic(name, module_id, description, "Published")
    addToDB(topic)
    return "Added new topic successfully!"

@app.route('/update-course', methods=['POST'])
def updateCourse():
    name = request.values.get('name')
    new_code = request.values.get('new_code')
    new_name = request.values.get('new_name')
    state = request.values.get('state')
    if (state == "Draft"):
        draftCourse = Course.query.filter_by(name=name, state=state).first()
        publishedCourse = Course.query.filter_by(name=name).first()
        if (draftCourse):
            draftCourse.name = new_name
            draftCourse.code = new_code
            db.session.commit()
        else:
            course = Course(new_name, new_code, state, publishedCourse.id)
            addToDB(course)
    else:
        course = Course.query.filter_by(name=name, state="Draft").first()
        if (course):
            published_course_id = course.publishedId
            db.session.delete(course)
            course = Course.query.filter_by(id=published_course_id).first()
        else:
            course = Course.query.filter_by(name=name).first()
        course.name = new_name
        course.code = new_code
        course.state = state
        db.session.commit()
    return "Updated course successfully!"
    
@app.route('/update-module', methods=['POST'])
def updateModule():
    name = request.values.get('name')
    new_name = request.values.get('new_name')
    state = request.values.get('state')
    getModule = Module.query.filter_by(name=name).first()
    if (state == "Draft"):
        draftModule = Module.query.filter_by(name=name, state=state).first()
        publishedModule = Module.query.filter_by(name=name).first()
        if (draftModule):
            draftModule.name = new_name
            db.session.commit()
        else:
            module = Module(new_name, getModule.course_id, state, publishedModule.id)
            addToDB(module)
    else:
        module = Module.query.filter_by(name=name, state="Draft").first()
        if (module):
            published_module_id = module.publishedId
            db.session.delete(module)
            module = Module.query.filter_by(id=published_module_id).first()
        else:
            module = Module.query.filter_by(name=name).first()
        module.name = new_name
        module.state = state
        db.session.commit()
    return "Updated module successfully!"

@app.route('/update-topic', methods=['POST'])
def updateTopic():
    name = request.values.get('name')
    new_name = request.values.get('new_name')
    description = request.values.get('description')
    state = request.values.get('state')
    getTopic = Topic.query.filter_by(name=name).first()
    if (state == "Draft"):
        draftTopic = Topic.query.filter_by(name=name, state=state).first()
        publishedTopic = Topic.query.filter_by(name=name).first()
        if (draftTopic):
            draftTopic.name = new_name
            draftTopic.description = description
            db.session.commit()
        else:
            topic = Topic(new_name, getTopic.module_id, description, state, publishedTopic.id)
            addToDB(topic)
    else:
        topic = Topic.query.filter_by(name=name, state="Draft").first()
        if (topic):
            published_topic_id = topic.publishedId
            db.session.delete(topic)
            topic = Topic.query.filter_by(id=published_topic_id).first()
        else:
            topic = Topic.query.filter_by(name=name).first()
        topic.name = new_name
        topic.description = description
        topic.state = state
        db.session.commit()
    
    return "Updated topic successfully!"

@app.route('/get-courses', methods=['GET'])
@cross_origin()
def getCourses():
    courses = Course.query.all()
    return jsonify(list_of_courses=[e.serialize() for e in courses])

@app.route('/get-modules-by-course', methods=['GET'])
@cross_origin()
def getModulesByCourseName():
    course_name = request.args.get('course_name')
    course = Course.query.filter_by(name=course_name).first()
    modules = Module.query.filter_by(course_id=course.id).all()
    return jsonify(list_of_modules=[e.serialize() for e in modules])

@app.route('/get-topics-by-module', methods=['GET'])
@cross_origin()
def getTopicsByModuleName():
    module_name = request.args.get('module_name')
    module = Module.query.filter_by(name=module_name).first()
    topics = Topic.query.filter_by(module_id=module.id).all()
    return jsonify(list_of_topics=[e.serialize() for e in topics])

def addToDB(entity):
    db.session.add(entity)
    db.session.commit()
    
app.run(debug = True, host = '0.0.0.0', port=5000)
