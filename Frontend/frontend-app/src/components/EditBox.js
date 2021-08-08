import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'

import '../App.css';

function EditBox(props) {

    const { type } = props.data
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
                            <TextField id="outlined-basic" label="Course Name" value={courseName} />
                            <TextField id="outlined-basic" label="Course Code" value={courseCode} />
                        </Grid>
                        <Grid item xs={12} className={classes.paper}>
                            <Button id="publish-button" variant="contained" color="primary" onClick={() => publishCourse()}>Publish Course</Button>
                        </Grid>
                    </>
                    :
                    (boxType == "Module" ?
                        <>
                            <Grid item xs={12} className={classes.paper}>
                                <TextField id="outlined-basic" label="Module Name" variant="outlined" value={moduleName} />
                            </Grid>
                            <Grid item xs={12} className={classes.paper}>
                                <Button id="publish-button" variant="contained" color="primary" onClick={() => publishModule()}>Publish Module</Button>
                            </Grid>
                        </>
                        :
                        <>
                            <Grid item xs={12} className={classes.paper}>
                                <TextField id="outlined-basic" label="Topic Name" variant="outlined" value={topicName}/>
                                <TextField id="outlined-basic" label="Description" variant="outlined"  value={description}/>
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