import React, { useEffect } from 'react'
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';
import EditBox from './EditBox';
import Grid from '@material-ui/core/Grid';
import CreateBox from './CreateBox';
import { Button } from '@material-ui/core';

function Listing() {

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        gridStyle: {
            flexGrow: 1,
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));

    const classes = useStyles()
    const [courses, setCourses] = React.useState([])
    const [type, setType] = React.useState('course')
    const [editCourseData, setEditCourseData] = React.useState({
        name: '',
        code: '',
        course: null
    })

    const [modules, setModules] = React.useState([]);
    const [editModuleData, setEditModuleData] = React.useState({
        name: '',
        module: null
    });

    const [topics, setTopics] = React.useState([]);
    const [editTopicData, setEditTopicData] = React.useState({
        name: '',
        description: '',
        topic: null
    });

    const [clickedCourse, setClickedCourse] = React.useState('')
    const [clickedModule, setClickedModule] = React.useState('')

    const getCourses = async () => {
        var result = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + 'get-published-courses')
        if (result && result.data && result.data.list_of_courses) {
            setCourses(result.data.list_of_courses)
        }
    }

    const handleCourseClick = async (course) => {
        setType('module')
        await getModulesByCourse(course.name)
        setClickedCourse(course)
    }

    const handleModuleClick = async (module) => {
        setType('topic')
        await getTopicsByModule(module.name)
        setClickedModule(module)
    }

    const handleClickEditCourse = async (course) => {

        const draftVersion = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + 'get-draft-if-any', {
            params: {
                type: 'course',
                id: course.id
            }
        })
        if (Object.keys(draftVersion.data).length) {
            const draftData = {
                name: draftVersion.data.name,
                code: draftVersion.data.code,
                course: course
            }
            setEditCourseData(draftData)
        } else {
            setEditCourseData({
                name: '',
                code: ''
            })
        }
    }

    const handleClickDeleteCourse = async (course) => {
        await axios.delete(process.env.REACT_APP_BACKEND_ADDRESS + 'delete-entity', {
            params: {
                type: 'course',
                id: course.id
            }
        })
    }

    const getModulesByCourse = async (name) => {
        var result = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + 'get-modules-by-course', {
            params: {
                course_name: name
            }
        })
        if (result && result.data && result.data.list_of_modules) {
            setModules(result.data.list_of_modules)
        }
    }

    const handleClickEditModule = async (module) => {

        const draftVersion = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + 'get-draft-if-any', {
            params: {
                type: 'module',
                id: module.id
            }
        })
        if (Object.keys(draftVersion.data).length) {
            const draftData = {
                name: draftVersion.data.name,
                module: module
            }
            setEditModuleData(draftData)
        } else {
            setEditModuleData({
                name: ''
            })
        }
    }

    const handleClickDeleteModule = async (module) => {
        await axios.delete(process.env.REACT_APP_BACKEND_ADDRESS + 'delete-entity', {
            params: {
                type: 'module',
                id: module.id
            }
        })
    }

    const getTopicsByModule = async (name) => {
        var result = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + 'get-topics-by-module', {
            params: {
                module_name: name
            }
        })
        if (result && result.data && result.data.list_of_topics) {
            setTopics(result.data.list_of_topics)
        }
    }

    const handleClickEditTopic = async (topic) => {

        const draftVersion = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + 'get-draft-if-any', {
            params: {
                type: 'topic',
                id: topic.id
            }
        })
        if (Object.keys(draftVersion.data).length) {
            const draftData = {
                name: draftVersion.data.name,
                topic: topic
            }
            setEditTopicData(draftData)
        } else {
            setEditTopicData({
                name: '',
                description: ''
            })
        }
    }

    const handleClickDeleteTopic = async (topic) => {
        await axios.delete(process.env.REACT_APP_BACKEND_ADDRESS + 'delete-entity', {
            params: {
                type: 'topic',
                id: topic.id
            }
        })
    }

    useEffect(() => {
        getCourses()
    }, []);

    return (
        <>
            {type == "course" ?
                (
                    <Grid container className={classes.gridStyle} spacing={2}>
                        <Grid item xs={12} className={classes.paper}>
                            <CreateBox data={{
                                type: "Course"
                            }} />
                        </Grid>
                        <Grid item xs={6} className={classes.paper}>
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        Courses
                                    </ListSubheader>
                                }
                                className={classes.root}
                            >
                                {courses && courses.map((course, index) => {
                                    return <React.Fragment key={index}>
                                        <Grid item xs={6}>
                                            <ListItem button onClick={() => handleCourseClick(course)}>{course.name}</ListItem>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button onClick={() => handleClickEditCourse(course)}>Edit</Button>
                                            <Button onClick={() => handleClickDeleteCourse(course)}>Delete</Button>
                                        </Grid>
                                    </React.Fragment>
                                })}
                            </List>
                        </Grid>
                        <Grid item xs={6} className={classes.paper}>
                            <EditBox data={{
                                type: "Course",
                                editCourseData
                            }} />
                        </Grid>
                    </Grid >
                ) : type == "module" ? (
                    <Grid container className={classes.gridStyle} spacing={2}>
                        <Grid item xs={12} className={classes.paper}>
                            <CreateBox data={{
                                type: "Module",
                                entity_id: clickedCourse.id
                            }} />
                        </Grid>
                        <Grid item xs={6} className={classes.paper}>
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        Modules
                                    </ListSubheader>
                                }
                                className={classes.root}
                            >
                                {modules && modules.map((module, index) => {
                                    return <React.Fragment key={index}>
                                        <Grid item xs={6}>
                                            <ListItem button onClick={() => handleModuleClick(module)}>
                                                {module.name}
                                            </ListItem>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button onClick={() => handleClickEditModule(module)}>Edit</Button>
                                            <Button onClick={() => handleClickDeleteModule(module)}>Delete</Button>
                                        </Grid>
                                    </React.Fragment>
                                })}
                            </List>
                        </Grid>
                        <Grid item xs={6} className={classes.paper}>
                            <EditBox data={{
                                type: "Module",
                                editModuleData
                            }} />
                        </Grid>
                    </Grid >
                ) : (
                    <Grid container className={classes.gridStyle} spacing={2}>
                        <Grid item xs={12} className={classes.paper}>
                            <CreateBox data={{
                                type: "Topic",
                                entity_id: clickedModule.id
                            }} />
                        </Grid>
                        <Grid item xs={6} className={classes.paper}>
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        Topics
                                    </ListSubheader>
                                }
                                className={classes.root}
                            >
                                {topics && topics.map((topic, index) => {
                                    return <React.Fragment key={index}>
                                        <Grid item xs={6}>
                                            <ListItem button>
                                                {topic.name}
                                            </ListItem>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button onClick={() => handleClickEditTopic(topic)}>Edit</Button>
                                            <Button onClick={() => handleClickDeleteTopic(topic)}>Delete</Button>
                                        </Grid>
                                    </React.Fragment>
                                })}
                            </List>
                        </Grid>
                        <Grid item xs={6} className={classes.paper}>
                            <EditBox data={{
                                type: "Topic",
                                editTopicData
                            }} />
                        </Grid>
                    </Grid >
                )
            }
        </>
    );
}

export default Listing;