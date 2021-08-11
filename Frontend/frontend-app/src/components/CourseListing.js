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

function CourseListing() {

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

    const [courseModules, setCourseModules] = React.useState([]);
    const [clickedCourse, setClickedCourse] = React.useState('')

    
    const [isOpen, setIsOpen] = React.useState(false);
    const [apiResponse, setAPIResponse] = React.useState('');

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const getCourses = async () => {
        var result = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + 'get-published-courses')
        if (result && result.data && result.data.list_of_courses) {
            setCourses(result.data.list_of_courses)
        }
    }

    const handleCourseClick = async (course) => {
        setType('module')
        setClickedCourse(course)
    }

    const handleClickEditCourse = async (course) => {
        togglePopup()
        setClickedCourse(course)
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
        await getModulesByCourse(course.id)
    }

    const handleClickDeleteCourse = async (course) => {
        const response = await axios.delete(process.env.REACT_APP_BACKEND_ADDRESS + 'delete-entity', {
            params: {
                type: 'course',
                id: course.id
            }
        })
        if (response.status == 200) {
            setAPIResponse(response.data.message)
        } else {
            setAPIResponse("Failed to delete topic")
        }
    }
    
    const getDraftVersion = (list_of_modules, module_id) => {
        const draft = list_of_modules.filter((module) => {
            if (module.published_id == module_id) {
                return module.name
            }
        })
        return draft
    }

    const getModulesByCourse = async (id) => {

        var result = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + 'get-modules-by-course', {
            params: {
                course_id: id
            }
        })
        if (result && result.data && result.data.list_of_modules) {
            result.data.list_of_modules.forEach(module => {
                const draftVersion = getDraftVersion(result.data.list_of_modules, module.id)
                if (Object.keys(draftVersion).length)
                    module.draft_version = getDraftVersion(result.data.list_of_modules, module.id)[0].name
            })
            setCourseModules(result.data.list_of_modules)
        }
        return result.data.list_modules
    }

    useEffect(() => {
        getCourses()
    }, []);

    return (
        <React.Fragment>
            <Grid container className={classes.gridStyle} spacing={2}>
                <Grid item xs={6} className={classes.paper}>
                    <CreateBox data={{
                        type: "Course"
                    }} />
                </Grid>
                <Grid item xs={6} className={classes.paper}>
                    <label>Courses</label>
                    <List>
                        {courses && courses.map((course, index) => {
                            return <React.Fragment key={index}>
                                <Grid item xs={6}>
                                    <ListItem button onClick={() => handleCourseClick(course)}>{course.name} ({course.code})</ListItem>
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
                    {isOpen && <EditBox data={{
                        type: "Course",
                        editCourseData,
                        clickedCourse,
                        courseModules
                    }}
                        handleClose={togglePopup} />
                    }
                </Grid>
                {apiResponse}
            </Grid >
        </React.Fragment>
    );
}

export default CourseListing;