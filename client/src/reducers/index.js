import { combineReducers } from 'redux';
import admin,* as adminSelectors from './admin'
import app, * as appSelectors from './app';
import elements, * as elementSelectors from './elements'
import report,* as reportSelectors from './report'
import user,* as userSelectors from './user'
import spotify, * as spotifySelectors from './spotify'
import cart, * as cartSelectors from './cart'
import binnacle, * as binnacleSelectors from './binnacle'
import simulator, * as simulatorSelectors from './simulation'
import mongo, * as mongoSelectors from "./mongo";

const reducer = combineReducers({
    admin,
    app,
    elements,
    report,
    user,
    spotify,
    cart,
    binnacle,
    simulator,
    mongo
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
export const getDeezerId = state => elementSelectors.getDeezerID(state.elements)
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
export const getBinnacle = (state) => binnacleSelectors.getBinnacle(state.binnacle)
export const getValidTracks = state => simulatorSelectors.getValidTracks(state.simulator);
export const getValidUsers = state => simulatorSelectors.getValidUsers(state.simulator);
export const getDailyPlays = state => simulatorSelectors.getDailyPlays(state.simulator);
export const getDailySells = state => simulatorSelectors.getDailySells(state.simulator);
export const getSimulationState = state => simulatorSelectors.getSimulationState(state.simulator);
export const getTopPlayed = state => simulatorSelectors.getTopPlayed(state.simulator);
export const getTopSelled = state => simulatorSelectors.getTopSelled(state.simulator);
export const getTopInteraction = state => simulatorSelectors.getTopInteraction(state.simulator);
export const getLoader = state => simulatorSelectors.getLoader(state.simulator);
export const getActions = state => simulatorSelectors.getActions(state.simulator);
export const getDays = state => simulatorSelectors.getDays(state.simulator);
export const getDone = state => simulatorSelectors.getDone(state.simulator);
export const getMongoReports = state =>  mongoSelectors.getAllReports(state.mongo)