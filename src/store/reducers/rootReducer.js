import {
    ADD_TASK,
    AUTH,
    AUTH_LOGOUT,
    AUTH_SUCCESS,
    DEL_TASK, EDIT_TASK, FETCH_TASKS_ERROR, FETCH_TASKS_START, FETCH_TASKS_SUCCESS,
    HANDLE_ANCHOR_CLOSE,
    HANDLE_AUTH_MODAL_CLOSE,
    HANDLE_AUTH_MODAL_OPEN,
    HANDLE_CHANGE_FIELD,
    HANDLE_CHANGE_PAGE,
    HANDLE_MODAL_CLOSE,
    HANDLE_MODAL_OPEN,
    HANDLE_REQUEST_SORT,
    SET_TASK_STATUS, TASK_EDIT
} from "../actions/actionTypes";

const initialState = {
    headRows: [
        { id: 'id', numeric: true, disablePadding: true, label: 'ID' },
        { id: 'username', numeric: false, disablePadding: false, label: 'Имя пользователя' },
        { id: 'email', numeric: false, disablePadding: false, label: 'E-mail' },
        { id: 'text', numeric: false, disablePadding: false, label: 'Текст задачи' },
        { id: 'status', numeric: true, disablePadding: true, label: 'Статус задачи' },
    ],
    rows: [],
    // rows: [
    //     {id: 1, username: 'Test user 1', email: 'test1@test.com', text: 'Create React App 1', status: 0},
    //     {id: 2, username: 'Test user 2', email: 'test2@test.com', text: 'Create React App 2', status: 0},
    //     {id: 3, username: 'Test user 3', email: 'test3@test.com', text: 'Create React App 3', status: 10},
    //     {id: 4, username: 'Test user 4', email: 'test4@test.com', text: 'Create React App 4', status: 0},
    //     {id: 5, username: 'Test user 5', email: 'test5@test.com', text: 'Create React App 5', status: 0},
    //     {id: 6, username: 'Test user 6', email: 'test6@test.com', text: 'Create React App 6', status: 10},
    // ],
    page: 0,
    rowsPerPage: 3,
    order: 'desc',
    orderBy: '',
    isOpenModal: false,
    isAuthOpenModal: false,
    isAuth: false,
    editTask: null,
    userName: '',
    userPassword: '',
    userEmail: '',
    token: null,
    anchorEl: null,
    loading: false,
    error: null,
    taskCount: 0
}

export default function rootReducer(state = initialState, action) {
    switch(action.type) {
        case HANDLE_CHANGE_PAGE:
            return {
                ...state, page: action.newPage
            }
        case HANDLE_REQUEST_SORT:
            return {
                ...state, order: action.str, orderBy: action.property
            }
        case HANDLE_MODAL_OPEN:
            return {
                ...state, isOpenModal: true
            }
        case HANDLE_MODAL_CLOSE:
            return {
                ...state, isOpenModal: false, editTask: null
            }
        case HANDLE_AUTH_MODAL_OPEN:
            return {
                ...state, isAuthOpenModal: true
            }
        case HANDLE_AUTH_MODAL_CLOSE:
            return {
                ...state, isAuthOpenModal: false
            }
        case HANDLE_CHANGE_FIELD:
            return {
                ...state, [action.name]: action.event.target.value
            }
        case ADD_TASK:
            return {
                ...state,
                rows: [
                    ...state.rows,
                    action.taskItem
                ]
            }
        case AUTH:
            return {
                ...state, userName: action.email, userPassword: action.password
            }
        case HANDLE_ANCHOR_CLOSE:
            return {
                ...state, anchorEl: null
            }
        case AUTH_SUCCESS:
            return {
                ...state, token: action.token, isAuth: true
            }
        case AUTH_LOGOUT:
            return {
                ...state, token: null, isAuth: false
            }
        case SET_TASK_STATUS:
            return {
                ...state,
                rows: [
                    ...state.rows.slice(0, action.idx),
                    action.newTask,
                    ...state.rows.slice(action.idx + 1)
                ]
            }
        case DEL_TASK:
            return {
                ...state,
                rows: [
                    ...state.rows.slice(0, action.idx),
                    ...state.rows.slice(action.idx + 1)
                ]
            }
        case EDIT_TASK:
            return {
                ...state, editTask: action.idx
            }
        case TASK_EDIT:
            return {
                ...state, editTask: null, isOpenModal: false,
                rows: [
                    ...state.rows.slice(0, action.idx),
                    action.taskItem,
                    ...state.rows.slice(action.idx + 1)
                ]
            }
        case FETCH_TASKS_START:
            return {
                ...state, loading: true
            }
        case FETCH_TASKS_SUCCESS:
            return {
                ...state, loading: false, rows: action.tasks, taskCount: action.tasks.length
            }
        case FETCH_TASKS_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        default:
            return state
    }
}
