// import React, { useEffect } from 'react'
// import '../App.css';
// import { makeStyles } from '@material-ui/core/styles';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import axios from 'axios';
// import EditBox from './EditBox';
// import Grid from '@material-ui/core/Grid';
// import CreateBox from './CreateBox';
// import { Link } from "react-router-dom";
// import { Icon, Button } from '@material-ui/core';

// function Topics(props) {

//     const useStyles = makeStyles((theme) => ({
//         root: {
//             width: '100%',
//             maxWidth: 360,
//             backgroundColor: theme.palette.background.paper,
//         },
//         gridStyle: {
//             flexGrow: 1,
//         },
//         nested: {
//             paddingLeft: theme.spacing(4),
//         },
//         paper: {
//             padding: theme.spacing(2),
//             textAlign: 'center',
//             color: theme.palette.text.secondary,
//         },
//     }));
    
//     const classes = useStyles();
//     const [topics, setTopics] = React.useState([]);
//     const [editTopicData, setEditTopicData] = React.useState({
//         name: '',
//         module: null
//     });

//     const getTopicsByModule = async () => {
//         var result = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + 'get-modules-by-course')
//         if (result && result.data && result.data.list_of_modules) {
//             setModules(result.data.list_of_modules)
//         }
//     }
    
//     const handleClickEditModule = async (module) => {
        
//         const draftVersion = await axios.get(process.env.REACT_APP_BACKEND_ADDRESS + 'get-draft-if-any', {
//             params: {
//                 type: 'module',
//                 id: module.id
//             }
//         })
//         if (Object.keys(draftVersion.data).length) {
//             const draftData = {
//                 name: draftVersion.data.name,
//                 module: module
//             }
//             setEditModuleData(draftData)
//         } else {
//             setEditModuleData({
//                 name: '',
//                 module: module
//             })
//         }
//     }

//     const handleClickDeleteModule = async (module) => {
//         await axios.delete(process.env.REACT_APP_BACKEND_ADDRESS + 'delete-entity', {
//             params: {
//                 type: 'module',
//                 id: module.id
//             }
//         })
//     }

//     useEffect(() => {
//         getModulesByCourse()
//     }, []);

//     return (
//         <Grid container className={classes.gridStyle} spacing={2}>
//             <Grid item xs={12} className={classes.paper}>
//                 <CreateBox type={"Module"} />
//             </Grid>
//             <Grid item xs={6} className={classes.paper}>
//                 <List
//                     component="nav"
//                     aria-labelledby="nested-list-subheader"
//                     subheader={
//                         <ListSubheader component="div" id="nested-list-subheader">
//                             Modules
//                         </ListSubheader>
//                     }
//                     className={classes.root}
//                 >
//                     {modules && modules.map((module, index) => {
//                         return <React.Fragment key={index}>
//                             <Grid item xs={6}>
//                                 <ListItem button>
//                                     <Link to={{
//                                         pathname: '/topic',
//                                         state: { props: "state" }
//                                     }}
//                                     >{module.name}</Link>
//                                 </ListItem>
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <Button onClick={() => handleClickEditModule(module)}>Edit</Button>
//                                 <Button onClick={() => handleClickDeleteModule(module)}>Delete</Button>
//                             </Grid>
//                         </React.Fragment>
//                     })}
//                 </List>
//             </Grid>
//             <Grid item xs={6} className={classes.paper}>
//                 <EditBox data={editModuleData}/>
//             </Grid>
//         </Grid >
//     );
// }

// export default Modules;