import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import debounce from 'lodash-es/debounce'
import '../App.css';
import ModuleListing from './ModuleListing'

function EditBox(props) {

    const { type, clickedCourse, courseModules } = props.data
    let boxType = type

    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 200,
            },
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));

    useEffect(() => {
        switch (type) {
            case "Course":
                setCourseName(props.data.editCourseData.name)
                setCourseCode(props.data.editCourseData.code)
                break;
            case "Module":
                setModuleName(props.data.editModuleData.name)
                break;
            case "Topic":
                setTopicName(props.data.editTopicData.name)
                setDescription(props.data.editTopicData.description)
                break;
        }
    }, [props]);

    const classes = useStyles();
    const [courseName, setCourseName] = React.useState('');
    const [courseCode, setCourseCode] = React.useState('');
    const [moduleName, setModuleName] = React.useState('');
    const [topicName, setTopicName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [apiResponse, setAPIResponse] = React.useState('');

    const updateCourse = async (state) => {
        var bodyFormData = new FormData();
        bodyFormData.append('name', props.data.editCourseData.name || props.data.clickedCourse.name)
        bodyFormData.append('new_name', courseName);
        bodyFormData.append('new_code', courseCode);
        bodyFormData.append('state', state);

        const response = await axios.post(process.env.REACT_APP_BACKEND_ADDRESS + '/update-course', bodyFormData)

        if (response.status == 200) {
            setAPIResponse(response.data.message)
        } else {
            setAPIResponse("Failed to update course")
        }
    }

    const updateModule = async (state) => {
        var bodyFormData = new FormData();
        bodyFormData.append('name', props.data.editModuleData.name || props.data.clickedModule.name)
        bodyFormData.append('new_name', moduleName);
        bodyFormData.append('state', state);

        const response = await axios.post(process.env.REACT_APP_BACKEND_ADDRESS + '/update-module', bodyFormData)

        if (response.status == 200) {
            setAPIResponse(response.data.message)
        } else {
            setAPIResponse("Failed to update module")
        }
    }


    const handleChange = (event) => {
        switch (event.target.name) {
            case "course-name":
                setCourseName(event.target.value)
                break
            case "course-code":
                setCourseCode(event.target.value)
                break
            case "module-name":
                setModuleName(event.target.value)
                break
            case "topic-name":
                setTopicName(event.target.value)
                break
            case "description":
                setDescription(event.target.value)
                break
        }
    }

    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                <Grid container className={classes.gridStyle} spacing={2}>
                    <>
                        <Grid item xs={12} className={classes.paper}>
                            <TextField id="outlined-basic" label="Course Name" variant="outlined" name="course-name" onChange={handleChange} value={courseName} />
                            <TextField id="outlined-basic" label="Course Code" variant="outlined" name="course-code" onChange={handleChange} value={courseCode} />
                        </Grid>
                        <Grid item xs={12} className={classes.paper}>
                            <Button id="publish-button" variant="contained" color="primary" onClick={() => updateCourse("Published")}>Publish Course</Button>
                            <Button id="publish-button" variant="contained" color="secondary" onClick={() => updateCourse("Draft")}>Save as Draft</Button>
                        </Grid>
                        <Grid item xs={12} className={classes.paper}>
                            <ModuleListing data={{clickedCourse, courseModules}} />
                        </Grid>
                    </>
                    {apiResponse}
                </Grid>
            </div>
        </div>
    );
}

export default EditBox;