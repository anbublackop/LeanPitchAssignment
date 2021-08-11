import React, { useEffect } from 'react'
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import CreateBox from './CreateBox';
import { Button } from '@material-ui/core';

function ModuleListing(props) {

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

    const { clickedCourse, courseModules } = props.data
    
    const classes = useStyles()

    const [modules, setModules] = React.useState(courseModules);

    const [apiResponse, setAPIResponse] = React.useState('');

    const handleClickDeleteModule = async (module) => {
        const response = await axios.delete(process.env.REACT_APP_BACKEND_ADDRESS + 'delete-entity', {
            params: {
                type: 'module',
                id: module.id
            }
        })
        if (response.status == 200) {
            setAPIResponse(response.data.message)
        } else {
            setAPIResponse("Failed to delete topic")
        }
    }

    const handleChange = (event, index) => {
        const updatedModules = modules
        updatedModules[index].name = event.target.value
        setModules(updatedModules)
    }

    const saveAsDraft = async (module, index) => {

        // We are having the id of the module. Get the published name from it and update the existing record.

        // old_name: getNamefromModuleID
        // new_name: modules object is updated with new name. get name from module.name
        // state: state 
        
        var bodyFormData = new FormData();
        bodyFormData.append('name', courseModules[index].name)
        bodyFormData.append('new_name', module.name);
        bodyFormData.append('state', "Draft");

        const response = await axios.post(process.env.REACT_APP_BACKEND_ADDRESS + '/update-module', bodyFormData)

        if (response.status == 200) {
            setAPIResponse(response.data.message)
        } else {
            setAPIResponse("Failed to update module")
        }

    }

    return (
        <React.Fragment>
            <Grid container className={classes.gridStyle} spacing={2}>
                <Grid item xs={6} className={classes.paper}>
                    <CreateBox data={{
                        type: "Module",
                        entity_id: clickedCourse.id
                    }} />
                </Grid>
                <Grid item xs={6} className={classes.paper}>
                    <label>Modules</label>
                    <List>
                        {modules && modules.map((module, index) => {
                            if (module.state == "Published") {
                                return <React.Fragment key={index}>
                                    <Grid item xs={12}>
                                        <ListItem>
                                            {module.name}
                                        </ListItem>
                                        <Grid item xs={6} className={classes.paper}>
                                            <TextField id="outlined-basic" label="Module Name" variant="outlined" name="module-name" onChange={(event) => handleChange(event, index)} value={module.draft_version} />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button onClick={() => saveAsDraft(module, index)}>Save as Draft</Button>
                                        <Button onClick={() => handleClickDeleteModule(module)}>Delete</Button>
                                    </Grid>
                                </React.Fragment>
                            }
                        })}
                    </List>
                </Grid>
                {apiResponse}
            </Grid >
        </React.Fragment>
    )
}

export default ModuleListing;