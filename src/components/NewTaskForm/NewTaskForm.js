import React, {Component} from 'react';
import classes from './NewTaskForm.module.scss'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {addTask, finishCreateTask, handleModalClose, taskEdit} from "../../store/actions/actions";
import {connect} from "react-redux";

class NewTaskForm extends Component {

    componentDidMount() {
        this.props.editTask !== null
            ?
                this.setState({
                    nameField: this.props.rows[this.props.editTask].username,
                    emailField: this.props.rows[this.props.editTask].email,
                    textField: this.props.rows[this.props.editTask].text
                })
            :
                this.setState({
                    nameField: '',
                    emailField: '',
                    textField: ''
                })
    }

    handleChangeField = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    addTaskHandler = event => {
        event.preventDefault()
        const itemID = this.props.rows.length === 0 ? 1 : Math.max.apply(Math, this.props.rows.map(function(o) { return o.id; })) + 1
        const taskItem = {
            id: itemID,
            username: this.state.nameField,
            email: this.state.emailField,
            text: this.state.textField,
            status: 0
        }
        this.props.addTask(taskItem)
        this.props.finishCreateTask()
        this.props.handleModalClose()
    }

    taskEditHandler = (event, id) => {
        event.preventDefault()
        const idx = id - 1
        const taskItem = {
            id,
            username: this.state.nameField,
            email: this.state.emailField,
            text: this.state.textField,
            status: 0
        }
        this.props.taskEdit(idx, taskItem)
    }

    submitTaskHandler = event => {
        event.preventDefault()
    }

    render() {
        return (
            <div className={classes.NewTaskForm}>
                <form onSubmit={this.submitTaskHandler}>
                    <TextField
                        id="name"
                        label="Ваше имя"
                        className={classes.textField}
                        type="text"
                        name="name"
                        autoComplete="name"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        onChange={this.handleChangeField('nameField')}
                        defaultValue={this.props.editTask !== null ? this.props.rows[this.props.editTask].username : ''}
                    />
                    <TextField
                        id="email"
                        label="Email"
                        className={classes.textField}
                        type="email"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        onChange={this.handleChangeField('emailField')}
                        defaultValue={this.props.editTask !== null ? this.props.rows[this.props.editTask].email : ''}
                    />
                    <TextField
                        id="multiline"
                        label="Опишите Вашу задачу"
                        multiline
                        fullWidth
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        rows="10"
                        rowsMax="10"
                        onChange={this.handleChangeField('textField')}
                        defaultValue={this.props.editTask !== null ? this.props.rows[this.props.editTask].text : ''}
                    />
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.props.editTask === null ? this.addTaskHandler : event => this.taskEditHandler(event, this.props.rows[this.props.editTask].id)}
                        >
                            Записать
                        </Button>
                        <Button
                            variant="contained"
                            color="default"
                            className={classes.button}
                            onClick={this.props.handleModalClose}
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
        isOpenModal: state.isOpenModal,
        rows: state.rows,
        editTask: state.editTask
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleModalClose: () => dispatch(handleModalClose()),
        addTask: taskItem => dispatch(addTask(taskItem)),
        taskEdit: (idx, taskItem) => dispatch(taskEdit(idx, taskItem)),
        finishCreateTask: () => dispatch(finishCreateTask())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskForm)