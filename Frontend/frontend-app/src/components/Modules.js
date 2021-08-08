import React, { useEffect, useHistory } from 'react'
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';

function Modules(props) {

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
    const [modules, setModules] = React.useState([]);

    const getTopicsByModule = async (module) => {
        var result = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + 'get-modules-by-course', {
            params: {
                module_name: module
            }
        })
        setModules(result.data.list_of_modules)
    }

    useEffect(() => {
        // getCourses()
    }, []);
    
    return (
        <>
        Hello World
        </>   
        // <List
        //     component="nav"
        //     aria-labelledby="nested-list-subheader"
        //     subheader={
        //         <ListSubheader component="div" id="nested-list-subheader">
        //             Modules
        //         </ListSubheader>
        //     }
        //     className={classes.root}
        // >
        //     {modules && modules.map((module, index) => {
        //         return <React.Fragment key={index}>
        //             <ListItem button onClick={() => handleClickCourse(module)}>
        //                 <ListItemText primary={course.name} />
        //             </ListItem>
        //         </React.Fragment>
        //     })}
        // </List>
    );
}

export default Modules;