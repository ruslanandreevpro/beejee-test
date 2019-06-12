import React, { Component } from 'react';
import classes from './AppBar.module.scss'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {handleAnchorClose, handleAuthModalOpen} from "../../store/actions/actions";
import {connect} from "react-redux";
import AuthModal from "../AuthModal/AuthModal";

class MenuAppBar extends Component {

    handleMenu = event => {
        event.preventDefault()
    }

    render() {
        const open = Boolean(this.props.anchorEl);

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Список задач
                        </Typography>
                        {this.props.isAuth
                            ?
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={this.props.anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.props.handleAnchorClose}
                                >
                                    <MenuItem onClick={this.props.handleAnchorClose}>Выход</MenuItem>
                                </Menu>
                            </div>
                            :
                            <Button
                                color="inherit"
                                onClick={this.props.handleAuthModalOpen}
                            >
                                Войти
                            </Button>
                        }
                    </Toolbar>
                </AppBar>
                <AuthModal />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.isAuth,
        anchorEl: state.anchorEl
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleAuthModalOpen: () => dispatch(handleAuthModalOpen()),
        handleAnchorClose: () => dispatch(handleAnchorClose())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuAppBar)