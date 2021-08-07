import React, { useEffect } from 'react'
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import axios from 'axios';

function Courses() {

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }));

    const classes = useStyles();
    // const [openCourse, setOpenCourse] = React.useState(false);
    const [openModule, setOpenModule] = React.useState(false);
    const [courses, setCourses] = React.useState([]);
    // const [modules, setModules] = React.useState([]);
    // const [topics, setTopics] = React.useState([]);

    const getCourses = async () => {
        var result = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + 'get-courses')
        if (result && result.data && result.data.list_of_courses) {
            result.data.list_of_courses.forEach((course) => {
                course.openCourse = false
            })
            setCourses(result.data.list_of_courses)
        }
    }

    const getModulesByCourse = async (course) => {
        var result = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + 'get-modules-by-course', {
            params: {
                course_name: course
            }
        })
        setCourses(result.data.list_of_modules)
    }

    const getTopicsByModule = async (module) => {
        var result = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + 'get-topics-by-module', {
            params: {
                module_name: module
            }
        })
        setCourses(result.data.list_of_modules)
    }

    const handleClickCourse = async (course) => {
        await getModulesByCourse(course.name)
    };

    const handleClickModule = async (index) => {
        setOpenModule(!openModule);
        await getTopicsByModule()
    };

    useEffect(() => {
        getCourses()
    }, []);

    return (

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
                    <ListItem button onClick={() => handleClickCourse(course)}>
                        <ListItemText primary={course.name} />
                    </ListItem>
                </React.Fragment>
            })}



        </List>
    );
}

export default Courses;