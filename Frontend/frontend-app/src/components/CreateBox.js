import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import '../App.css';

function CreateBox(props) {

    let boxType = props.data.type;

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
    
    const { entity_id } = props.data

    const classes = useStyles();
    const [courseName, setCourseName] = React.useState('');
    const [courseCode, setCourseCode] = React.useState('');
    const [moduleName, setModuleName] = React.useState('');
    const [topicName, setTopicName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [apiResponse, setAPIResponse] = React.useState('');

    const addCourse = async (course_name, course_code) => {
        
        var bodyFormData = new FormData();
        bodyFormData.append('name', course_name);
        bodyFormData.append('code', course_code);

        const response = await axios.post(process.env.REACT_APP_BACKEND_ADDRESS + 'add-course', bodyFormData)
        
        if (response.status == 200) {
            setAPIResponse(response.data.message)
        } else {
            setAPIResponse("Failed to add course")
        }
    }

    const addModule = async (module_name) => {
        
        var bodyFormData = new FormData();
        bodyFormData.append('name', module_name);
        bodyFormData.append('course_id', entity_id);

        const response = await axios.post(process.env.REACT_APP_BACKEND_ADDRESS + 'add-module', bodyFormData)

        if (response.status == 200) {
            setAPIResponse(response.data.message)
        } else {
            setAPIResponse("Failed to add module")
        }
    }

    const addTopic = async (topic_name, description) => {
        var bodyFormData = new FormData();
        bodyFormData.append('name', topic_name);
        bodyFormData.append('module_id', entity_id);
        bodyFormData.append('description', description);

        const response = await axios.post(process.env.REACT_APP_BACKEND_ADDRESS + 'add-topic', bodyFormData)
        
        if (response.status == 200) {
            setAPIResponse(response.data.message)
        } else {
            setAPIResponse("Failed to add topic")
        }
    }

    const handleCourseClick = async () => {
        await addCourse(courseName, courseCode)
    }

    const handleModuleClick = async () => {
        await addModule(moduleName)
    }

    const handleTopicClick = async () => {
        await addTopic(topicName, description)
    }

    return (
        <div className={classes.root}>
            <Grid container className={classes.gridStyle} spacing={2}>
                {boxType == "Course" ?
                    <>
                        <Grid item xs={12} className={classes.paper}>
                            <TextField id="outlined-basic" label="Course Name" variant="outlined" onChange={e => setCourseName(e.target.value)} />
                            <TextField id="outlined-basic" label="Course Code" variant="outlined" onChange={e => setCourseCode(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} className={classes.paper}>
                            <Button id="publish-button" variant="contained" color="primary" onClick={() => handleCourseClick()}>Add Course</Button>
                        </Grid>
                    </>
                    :
                    (boxType == "Module" ?
                        <>
                            <Grid item xs={12} className={classes.paper}>
                                <TextField id="outlined-basic" label="Module Name" variant="outlined" onChange={e => setModuleName(e.target.value)}/>
                            </Grid>
                            <Grid item xs={12} className={classes.paper}>
                                <Button id="publish-button" variant="contained" color="primary" onClick={() => handleModuleClick()}>Add Module</Button>
                            </Grid>
                        </>
                        :
                        <>
                            <Grid item xs={12} className={classes.paper}>
                                <TextField id="outlined-basic" label="Topic Name" variant="outlined" onChange={e => setTopicName(e.target.value)}/>
                                <TextField id="outlined-basic" label="Description" variant="outlined" onChange={e => setDescription(e.target.value)}/>
                            </Grid>
                            <Grid item xs={12} className={classes.paper}>
                                <Button id="publish-button" variant="contained" color="primary" onClick={() => handleTopicClick()}>Add Topic</Button>
                            </Grid>
                        </>
                    )}
                <Grid item xs={12} className={classes.paper}>
                    {apiResponse}
                </Grid>
            </Grid>
        </div>
    );
}

export default CreateBox;