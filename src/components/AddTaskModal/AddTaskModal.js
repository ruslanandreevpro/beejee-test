import React, {Component} from 'react';
import classes from './AddTaskModal.module.scss'
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {handleModalClose} from "../../store/actions/actions";
import NewTaskForm from "../NewTaskForm/NewTaskForm";

class AddTaskModal extends Component {

    render() {
        return (
            <div className={classes.AddTaskModal}>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.isOpenModal}
                    onClose={this.props.handleModalClose}
                >
                    <div className={classes.paper}>
                        <Typography variant="h5" id="modal-title" align="center">
                            {this.props.editTask === null ? 'Добавить новую задачу' : 'Правка задачи'}
                        </Typography>
                        <NewTaskForm />
                    </div>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isOpenModal: state.isOpenModal,
        editTask: state.editTask
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleModalClose: () => dispatch(handleModalClose())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskModal)