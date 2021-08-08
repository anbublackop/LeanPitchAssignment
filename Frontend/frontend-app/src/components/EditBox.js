import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'

import '../App.css';

function EditBox(props) {

    let boxType = "Course"
    
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

    const classes = useStyles();
    const [courseName, setCourseName] = React.useState(props.data.name);
    const [courseCode, setCourseCode] = React.useState(props.data.code);
    const [moduleName, setModuleName] = React.useState('');
    const [moduleCourseId, setModuleCourseId] = React.useState(0);
    const [topicName, setTopicName] = React.useState('');
    const [topicModuleId, setTopicModuleId] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [apiResponse, setAPIResponse] = React.useState('');
    
    console.log("props inside edit box module", props)
    
    const saveCourseAsDraft = async () => {

        var bodyFormData = new FormData();
        bodyFormData.append('name', props.data.course.name)
        bodyFormData.append('new_name', courseName);
        bodyFormData.append('new_code', courseCode);
        bodyFormData.append('state', "Draft");

        const response = await axios.post(process.env.REACT_APP_BACKEND_ADDRESS + '/update-course', bodyFormData)
        
        if (response.status == 200) {
            setAPIResponse(response.data.message)
        } else {
            setAPIResponse("Failed to add course")
        }
    }

    const saveModuleAsDraft = () => {
        
    }

    const saveTopicAsDraft = () => {
        
    }

    const publishCourse = () => {

    };

    const publishModule = () => {

    };

    const publishTopic = () => {

    };

    return (
        <div className={classes.root}>
            <Grid container className={classes.gridStyle} spacing={2}>
                {boxType == "Course" ?
                    <>
                        <Grid item xs={12} className={classes.paper}>
                            <TextField id="outlined-basic" label="Course Name" value={props.data.name} />
                            <TextField id="outlined-basic" label="Course Code" value={props.data.code} />
                        </Grid>
                        <Grid item xs={12} className={classes.paper}>
                            <Button id="publish-button" variant="contained" color="primary" onClick={() => publishCourse()}>Publish Course</Button>
                        </Grid>
                    </>
                    :
                    (boxType == "Module" ?
                        <>
                            <Grid item xs={12} className={classes.paper}>
                                <TextField id="outlined-basic" label="Module Name" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} className={classes.paper}>
                                <Button id="publish-button" variant="contained" color="primary" onClick={() => publishModule()}>Publish Module</Button>
                            </Grid>
                        </>
                        :
                        <>
                            <Grid item xs={12} className={classes.paper}>
                                <TextField id="outlined-basic" label="Topic Name" variant="outlined" />
                                <TextField id="outlined-basic" label="Description" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} className={classes.paper}>
                                <Button id="publish-button" variant="contained" color="primary" onClick={() => publishTopic()}>Publish Topic</Button>
                            </Grid>
                        </>
                    )}
            </Grid>
        </div>
    );
}

export default EditBox;