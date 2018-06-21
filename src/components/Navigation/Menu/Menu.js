import React from 'react'; 
import classes from './Menu.css';

//If you need to change this go to 138 to watch his approach  
const menu = (props) => (
    <div onClick={props.openClick} className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
); 

export default menu; 