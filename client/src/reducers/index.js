import { combineReducers } from 'redux';
import admin,* as adminSelectors from './admin'
import app, * as appSelectors from './app';
import elements, * as elementSelectors from './elements'
import report,* as reportSelectors from './report'
import user,* as userSelectors from './user'
import search,* as searchSelectors from './search';

const reducer = combineReducers({
    admin,
    app,
    elements,
    report,
    user,
    search
})

export default reducer

export const getUser = state => userSelectors.getUser(state.user)
export const getReport = state => reportSelectors.getReport(state.report)
export const getElement = (state,id) => elementSelectors.getElement(state.elements,id)
export const getSection = (state,index) => elementSelectors.getSection(state.elements,index)
export const getAll = (state) => elementSelectors.getAll(state.elements)
export const getAppState = state => appSelectors.getAppState(state.app)
export const getPermission = (state,id) => adminSelectors.getPermission(state.admin,id)
export const getAllPermission = (state) => adminSelectors.getAllPermissions(state.admin)
export const getAdminState = state => adminSelectors.getAdminState(state.admin) 
export const getSearchQuery = state =>  searchSelectors.getSearchQuery(state.search)