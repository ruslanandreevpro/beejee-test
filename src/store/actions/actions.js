import {
    ADD_TASK,
    AUTH_LOGOUT,
    AUTH_SUCCESS,
    DEL_TASK,
    EDIT_TASK,
    FETCH_TASKS_ERROR,
    FETCH_TASKS_START,
    FETCH_TASKS_SUCCESS,
    HANDLE_ANCHOR_CLOSE,
    HANDLE_AUTH_MODAL_CLOSE,
    HANDLE_AUTH_MODAL_OPEN,
    HANDLE_CHANGE_FIELD,
    HANDLE_CHANGE_PAGE,
    HANDLE_MODAL_CLOSE,
    HANDLE_MODAL_OPEN,
    HANDLE_REQUEST_SORT, RESET_TASK_CREATION,
    SET_TASK_STATUS,
    TASK_EDIT
} from "./actionTypes";
import axios from '../../axios/axios';

export function handleChangePage(event, newPage) {
    return {
        type: HANDLE_CHANGE_PAGE,
        newPage
    }
}

export function setRequestSort(str, property) {
    return {
        type: HANDLE_REQUEST_SORT,
        str,
        property
    }
}

export function handleRequestSort(event, property) {
    return (dispatch, getState) => {
        const isDesc = getState().orderBy === property && getState().order === 'desc'
        isDesc ? dispatch(setRequestSort('asc', property)) : dispatch(setRequestSort('desc', property))
    }
}

export function handleModalOpen() {
    return {
        type: HANDLE_MODAL_OPEN
    }
}

export function handleModalClose() {
    return {
        type: HANDLE_MODAL_CLOSE
    }
}

export function handleAuthModalOpen() {
    return {
        type: HANDLE_AUTH_MODAL_OPEN
    }
}

export function handleAuthModalClose() {
    return {
        type: HANDLE_AUTH_MODAL_CLOSE
    }
}

export function handleChangeField(name, event) {
    return {
        type: HANDLE_CHANGE_FIELD,
        name,
        event
    }
}

export function addTask(taskItem) {
    return {
        type: ADD_TASK,
        taskItem
    }
}

export function auth(username, password) {
    return async dispatch => {
        const authData = {
            username, password
        }
        const url = `/login?developer=RuslanAndreev`
        const res = await axios.post(url, authData)
        const data = res.data
        console.log(data)
        const expirationDate = new Date(new Date().getTime() + data.expires * 1000)
        localStorage.setItem('token', data.token)
        localStorage.setItem('expirationDate', expirationDate)
        dispatch(authSuccess(data.token))
        // dispatch(autoLogout(data.expiresIn))
    }

}

export function handleAnchorClose() {
    return {
        type: HANDLE_ANCHOR_CLOSE
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        },time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function setTaskStatus(idx, newTask) {
    return {
        type: SET_TASK_STATUS,
        idx, newTask
    }
}

export function delTask(idx) {
    return {
        type: DEL_TASK,
        idx
    }
}

export function editTask(idx) {
    return {
        type: EDIT_TASK,
        idx
    }
}

export function taskEdit(idx, taskItem) {
    return {
        type: TASK_EDIT,
        idx,
        taskItem
    }
}

export function fetchTasks() {
    return async dispatch => {
        dispatch(fetchTaskStart())
        try {
            const response = await axios.get('/?developer=RuslanAndreev')
            const data = response.data.message.tasks
            const tasks = []
            Object.keys(data).forEach(() => {
                tasks.push({
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    text: data.text,
                    status: data.status
                })
            })
            dispatch(fetchTaskSuccess(tasks))
        } catch(e) {
            dispatch(fetchTaskError(e))
        }
    }
}

export function fetchTaskStart() {
    return {
        type: FETCH_TASKS_START
    }
}

export function fetchTaskSuccess(tasks) {
    return {
        type: FETCH_TASKS_SUCCESS,
        tasks
    }
}

export function fetchTaskError(e) {
    return {
        type: FETCH_TASKS_ERROR,
        error: e
    }
}

export function finishCreateTask() {
    return async (dispatch, getState) => {
        await axios.post('/create?developer=RuslanAndreev', getState().rows)
        dispatch(resetTaskCreation())
    }
}

export function resetTaskCreation() {
    return {
        type: RESET_TASK_CREATION
    }
}