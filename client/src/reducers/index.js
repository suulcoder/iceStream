import { combineReducers } from 'redux';
import admin,* as adminSelectors from './admin'
import app, * as appSelectors from './app';
import elements, * as elementSelectors from './elements'
import report,* as reportSelectors from './report'
import user,* as userSelectors from './user'
import spotify, * as spotifySelectors from './spotify'
import cart, * as cartSelectors from './cart'

const reducer = combineReducers({
    admin,
    app,
    elements,
    report,
    user,
    spotify,
    cart
})

export default reducer

export const getUser = state => userSelectors.getUser(state.user)
export const getUsers = (state,id) => userSelectors.getUsers(state.user,id)
export const getAllUsers = (state) => userSelectors.getAllUsers(state.user)
export const getReport = state => reportSelectors.getReport(state.report)
export const getBought = state => userSelectors.getBought(state.user)
export const getReportSection = (state, key) => reportSelectors.getReportSection(state.report, key)
export const getElement = (state,id) => elementSelectors.getElement(state.elements,id)
export const getSearchedElements = state => elementSelectors.getSearchedElements(state.elements)
export const getSection = (state,index) => elementSelectors.getSection(state.elements,index)
export const getSectionIDs = (state) => elementSelectors.getSectionIDs(state.elements)
export const getAll = (state) => elementSelectors.getAll(state.elements)
export const getSelected = state => elementSelectors.getSelected(state.elements)
export const getEdited = state => elementSelectors.getEdited(state.elements)
export const getAppState = state => appSelectors.getAppState(state.app)
export const getInfo = (state,id) => appSelectors.getSection(state.app,id)
export const getPermission = (state,id) => adminSelectors.getPermission(state.admin,id)
export const getAllPermission = (state) => adminSelectors.getAllPermissions(state.admin)
export const getAdminState = state => adminSelectors.getAdminState(state.admin)
export const getToken = state => spotifySelectors.getToken(state.spotify)
export const getAllCartId = state => cartSelectors.getTracksId(state.cart);
export const getCart = state => cartSelectors.getAllCart(state.cart);
export const getQuantity = (state,id) => cartSelectors.getQuantity(state.cart,id)