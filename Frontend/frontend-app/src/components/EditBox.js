import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import '../App.css';

function EditBox() {

    let boxType = "Course";

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

    const handleClick = () => {

    };

    return (
        <div className={classes.root}>
            {/* <form className={classes.root} noValidate autoComplete="off" onSubmit={() => handleClick()}> */}
                <Grid container className={classes.gridStyle} spacing={2}>
                    {boxType == "Course" ?
                        <>
                            <Grid item xs={12} className={classes.paper}>
                                <TextField id="outlined-basic" label="Course Name" variant="outlined" />
                                <TextField id="outlined-basic" label="Course Code" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} className={classes.paper}>
                                <Button id="publish-button" variant="contained" color="primary">Publish Course</Button>
                            </Grid>
                        </>
                        :
                        (boxType == "Module" ?
                            <>
                                <Grid item xs={12} className={classes.paper}>
                                    <TextField id="outlined-basic" label="Module Name" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} className={classes.paper}>
                                    <Button id="publish-button" variant="contained" color="primary">Publish Module</Button>
                                </Grid>
                            </>
                            :
                            <>
                                <Grid item xs={12} className={classes.paper}>
                                    <TextField id="outlined-basic" label="Topic Name" variant="outlined" />
                                    <TextField id="outlined-basic" label="Description" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} className={classes.paper}>
                                    <Button id="publish-button" variant="contained" color="primary">Publish Topic</Button>
                                </Grid>
                            </>
                        )}
                </Grid>
            {/* </form> */}
        </div>
    );
}

export default EditBox;