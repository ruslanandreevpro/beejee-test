import React, {Component} from 'react';
import classes from './AuthModal.module.scss'
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import {handleAuthModalClose} from "../../store/actions/actions";
import {connect} from "react-redux";
import AuthForm from "../AuthForm/AuthForm";

class AuthModal extends Component {
    render() {
        return (
            <div className={classes.AuthModal}>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.isAuthOpenModal}
                    onClose={this.props.handleAuthModalClose}
                >
                    <div className={classes.paper}>
                        <Typography variant="h5" id="modal-title" align="center">
                            Авторизация пользователя
                        </Typography>
                        <AuthForm />
                    </div>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthOpenModal: state.isAuthOpenModal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleAuthModalClose: () => dispatch(handleAuthModalClose())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal)