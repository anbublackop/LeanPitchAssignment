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

    const getCourses = async () => {
        var result = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + 'get-courses')
        if (result && result.data && result.data.list_of_courses) {
            result.data.list_of_courses.forEach((course) => {
                course.openCourse = false
            })
            setCourses(result.data.list_of_courses)
        }
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
                            <ListItem button>
                                <Link to={{
                                    pathname: '/module',
                                    state: {props: "state"}
                                }}
                                >{course.name}</Link>
                            </ListItem>
                        </React.Fragment>
                    })}
                </List>
            </Grid>
            <Grid item xs={6} className={classes.paper}>
                <EditBox />
            </Grid>
        </Grid >
    );
}

export default Courses;