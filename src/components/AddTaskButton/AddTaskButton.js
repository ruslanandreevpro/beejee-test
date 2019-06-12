import React, {Component} from 'react';
import classes from "./AddTaskButton.module.scss";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import {connect} from "react-redux";
import {handleModalOpen} from "../../store/actions/actions";
import AddTaskModal from "../AddTaskModal/AddTaskModal";

class AddTaskButton extends Component {

    render() {
        return (
            <div className={classes.AddTaskButton}>
                <Fab
                    color="primary"
                    aria-label="Add"
                    className={classes.fab}
                    onClick={this.props.handleModalOpen}
                >
                    <AddIcon />
                </Fab>
                <AddTaskModal />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleModalOpen: () => dispatch(handleModalOpen())
    }
}

export default connect(null, mapDispatchToProps)(AddTaskButton)