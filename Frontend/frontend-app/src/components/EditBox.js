import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import '../App.css';

function EditBox() {
    
    const useStyles = makeStyles((theme) => ({
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
          },
        },
      }));

    const classes = useStyles();

    const handleClick = () => {
        
    };

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={() => handleClick()}>
                <TextField id="outlined-basic" label="Course Name" variant="outlined" />
                <TextField id="outlined-basic" label="Course Code" variant="outlined" />
            </form>
        </div>
    );
}

export default EditBox;