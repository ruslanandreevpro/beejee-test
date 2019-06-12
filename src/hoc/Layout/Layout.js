import React, {Component} from 'react'
import classes from './Layout.module.scss'
import AppBar from "../../components/AppBar/AppBar";
import TODOList from "../../containers/TODOList/TODOList";
import AddTaskButton from "../../components/AddTaskButton/AddTaskButton";
import {connect} from "react-redux";

class Layout extends Component {
    render() {
        return (
            <div className={classes.Layout}>
                <AppBar />
                <TODOList />
                <main>
                    { this.props.children }
                </main>
                <AddTaskButton />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.loading
    }
}

export default connect(mapStateToProps)(Layout)