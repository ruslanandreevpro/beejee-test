import React, {Component} from 'react';
import classes from './TODOList.module.scss'
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import CustomTableHead from "../../components/CustomTableHead/CustomTableHead";
import {connect} from "react-redux";
import {
    delTask, editTask, fetchTasks,
    handleChangePage,
    handleModalOpen,
    handleRequestSort,
    setTaskStatus
} from "../../store/actions/actions";
import DoneIcon from '@material-ui/icons/Done'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from "@material-ui/core/IconButton";

class TODOList extends Component {

    componentDidMount() {
        this.props.fetchTasks()
    }

    desc(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    stableSort = (array, cmp) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

    getSorting = (order, orderBy) => {
        return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy)
    }

    setStatusHandler = (event, id) => {
        const itemID = id
        const idx = this.props.rows.findIndex(({id}) => id === itemID)
        const newTask = {...this.props.rows[idx], status: 10}
        this.props.setTaskStatus(idx, newTask)
    }

    editTaskHandler = (event, id) => {
        const itemID = id
        const idx = this.props.rows.findIndex(({id}) => id === itemID)
        this.props.editTask(idx)
        this.props.handleModalOpen()
    }

    delTaskHandler = (event, id) => {
        const itemID = id
        const idx = this.props.rows.findIndex(({id}) => id === itemID)
        this.props.delTask(idx)
    }

    render() {
        const emptyRows = this.props.rowsPerPage - Math.min(this.props.rowsPerPage, this.props.rows.length - this.props.page * this.props.rowsPerPage)

        return (
            <div className={classes.TODOList}>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <CustomTableHead
                            headRows={this.props.headRows}
                            order={this.props.order}
                            orderBy={this.props.orderBy}
                            onRequestSort={this.props.handleRequestSort}
                        />
                        <TableBody>
                            {this.stableSort(this.props.rows, this.getSorting(this.props.order, this.props.orderBy))
                                .slice(this.props.page * this.props.rowsPerPage, this.props.page * this.props.rowsPerPage + this.props.rowsPerPage)
                                .map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row" align="center">
                                        {row.id}
                                    </TableCell>
                                    <TableCell>{row.username}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.text}</TableCell>
                                    <TableCell
                                        align={this.props.isAuth ? "left" : "center"}
                                        className={classes.statusCell}
                                        style={this.props.isAuth ? {justifyContent: 'space-between'} : {justifyContent: 'center'}}
                                    >
                                        {row.status === 10 ? <p className={classes.done}>Завершено</p> : <p className={classes.process}>В работе</p>}
                                        {this.props.isAuth
                                            ?
                                                <div>
                                                    <IconButton className={classes.statusDone} color="primary" disabled={row.status === 10} onClick={event => this.setStatusHandler(event, row.id)}>
                                                        <DoneIcon />
                                                    </IconButton>
                                                    <IconButton className={classes.statusEdit} color="default" disabled={row.status === 10} onClick={event => this.editTaskHandler(event, row.id)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton className={classes.statusDelete} color="secondary" disabled={row.status === 10} onClick={event => this.delTaskHandler(event, row.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </div>
                                            : null}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={this.props.rows.length}
                        rowsPerPage={this.props.rowsPerPage}
                        rowsPerPageOptions={[]}
                        page={this.props.page}
                        backIconButtonProps={{
                            'aria-label': 'Назад',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Далее',
                        }}
                        onChangePage={this.props.handleChangePage}
                    />
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        headRows: state.headRows,
        rows: state.rows,
        page: state.page,
        rowsPerPage: state.rowsPerPage,
        order: state.order,
        orderBy: state.orderBy,
        token: state.token,
        isAuth: state.isAuth,
        editTask: state.editTask,
        loading: state.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleChangePage: (event, newPage) => dispatch(handleChangePage(event, newPage)),
        handleRequestSort: (event, property) => dispatch(handleRequestSort(event, property)),
        setTaskStatus: (idx, newTask) => dispatch(setTaskStatus(idx, newTask)),
        delTask: idx => dispatch(delTask(idx)),
        editTask: idx => dispatch(editTask(idx)),
        handleModalOpen: () => dispatch(handleModalOpen()),
        fetchTasks: () => dispatch(fetchTasks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TODOList)