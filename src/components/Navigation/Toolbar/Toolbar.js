import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems//NavigationItems';
import Menu from '../Menu/Menu';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Menu openClick={props.openDrawer}/>
        <div className={classes.Logo}>
            <Logo height="80%"/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header> 
);

export default toolbar; 