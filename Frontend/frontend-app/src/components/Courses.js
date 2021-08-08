import React, { useEffect } from 'react'
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import EditBox from './EditBox';
import Grid from '@material-ui/core/Grid';
import CreateBox from './CreateBox';
import { Link } from "react-router-dom";
import { Icon, Button } from '@material-ui/core';

function Courses() {

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            maxWidth: 360,
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

    const classes = useStyles();
    const [courses, setCourses] = React.useState([]);
    const [editCourseData, setEditCourseData] = React.useState({
        name: '',
        code: '',
        course: null
    });

    const getCourses = async () => {
        var result = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + 'get-published-courses')
        if (result && result.data && result.data.list_of_courses) {
            result.data.list_of_courses.forEach((course) => {
                course.openCourse = false
            })
            setCourses(result.data.list_of_courses)
        }
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
                code: '',
                course: course
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

    useEffect(() => {
        getCourses()
    }, []);

    return (
        <Grid container className={classes.gridStyle} spacing={2}>
            <Grid item xs={12} className={classes.paper}>
                <CreateBox type={"Course"} />
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
                                <ListItem button>
                                    <Link to={{
                                        pathname: '/module',
                                        state: { props: "state" }
                                    }}
                                    >{course.name}</Link>
                                </ListItem>
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
                <EditBox data={editCourseData}/>
            </Grid>
        </Grid >
    );
}

export default Courses;