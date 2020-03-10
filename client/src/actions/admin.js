import * as types from '../types/admin'

export const updateUser = (id,canAddArtist,canAddAlbum,candAddTrack,canInactivate,canModifyIDS,canEliminateIDS,canLogin) => ({
    type: types.user_permissions_updated,
    payload:{
        id,
        canAddArtist,
        canAddAlbum,
        candAddTrack,
        canInactivate,
        canModifyIDS,
        canEliminateIDS,
        canLogin
    }
})