import React, {Component} from 'react';
import classes from './AuthForm.module.scss'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {auth, handleAuthModalClose} from "../../store/actions/actions";
import {connect} from "react-redux";

class AuthForm extends Component {

    state = {
        userName: '',
        userPassword: ''
    }

    handleChangeField = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    authHandler = event => {
        event.preventDefault()
        const userName = this.state.userName
        const userPassword = this.state.userPassword
        this.props.auth(userName, userPassword)
        this.props.handleAuthModalClose()
    }

    submitTaskHandler = event => {
        event.preventDefault()
    }

    render() {
        return (
            <div className={classes.AuthForm}>
                <form onSubmit={this.submitTaskHandler}>
                    <TextField
                        required
                        id="name"
                        label="Имя пользователя"
                        className={classes.textField}
                        type="text"
                        name="name"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        onChange={this.handleChangeField('userName')}
                    />
                    <TextField
                        required
                        id="password"
                        label="Пароль"
                        className={classes.textField}
                        type="password"
                        name="password"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        onChange={this.handleChangeField('userPassword')}
                    />
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.authHandler}
                        >
                            Войти
                        </Button>
                        <Button
                            variant="contained"
                            color="default"
                            className={classes.button}
                            onClick={this.props.handleAuthModalClose}
                        >
                            Отмена
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthOpenModal: state.isAuthOpenModal,
        userName: state.userName,
        userPassword: state.userPassword,
        isAuth: state.isAuth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleAuthModalClose: () => dispatch(handleAuthModalClose()),
        auth: (user, password) => dispatch(auth(user, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)