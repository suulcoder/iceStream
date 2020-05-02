const query = require('./queries')
const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser')
const app = express();

const pool = new pg.Pool({
    port: 5432,
    user: 'admin',
    password: 'admin',
    database: 'ProyectoBasedeDatos'
})

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(express.urlencoded({ extended: true })) 
app.use(bodyParser.json())

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

const SQLQuery = (apiRoute,Query,method='get') => {
    switch (method) {
        case 'get':
            app.get(apiRoute,(request,res)=>{
                pool.connect((err,db,done)=>{
                    if(err){
                        return res.status(400).send(err)
                    }
                    db.query(Query,(err,table) => {
                        done();
                        if(err){
                            return res.status(400).send(err)
                        }
                        return res.status(201).send(table.rows)
                    })
                })
            });
            break;
        case 'post':
            app.post(apiRoute,function(request,response){
                const values = Object.values(request.body)
                pool.connect((err,db,done)=>{
                    done()
                    if(err){
                        return response.status(400).send(err)
                    }
                    else{
                        db.query(Query,values,(req,res) => {
                            if(err){
                                return response.status(400).send(err)
                            }
                            else{
                                return response.status(201).send(res)
                            }
                        })
                    }
                })
            });
            break;
    }
    return null
}

SQLQuery('/api/media',query.getAllMediaType)
SQLQuery('/api/user',query.getAllUsers)
SQLQuery('/api/artist',query.getAllArtist)
SQLQuery('/api/genre',query.getAllGenre)
SQLQuery('/api/album',query.getAllAlbum)
SQLQuery('/api/checkuser',query.getUserByUsername,'post')
SQLQuery('/api/checkusername',query.checkUserByUsername,'post')
SQLQuery('/api/adduser',query.addUser,'post')
SQLQuery('/api/addpermission',query.addUserPermission,'post')

SQLQuery('/api/newuserid',query.getLastUserId)
SQLQuery('/api/newartistid',query.getLastArtistId)
SQLQuery('/api/newalbumid',query.getLastAlbumId)
SQLQuery('/api/newtrackid',query.getLastTrackId)

SQLQuery('/api/getsongs',query.getAllSongs),
SQLQuery('/api/getalbums',query.getAllAlbum)

SQLQuery('/api/newArtist',query.addArtist,'post')
SQLQuery('/api/newAlbum',query.addAlbum,'post')
SQLQuery('/api/newTrack',query.addTrack,'post')
SQLQuery('/api/useralbum',query.addUserAlbum,'post')
SQLQuery('/api/userartist',query.addUserArtist,'post')
SQLQuery('/api/usertrack',query.addUserTrack,'post')

SQLQuery('/api/search/track',query.searchTrack,'post')
SQLQuery('/api/search/album',query.searchAlbum,'post')
SQLQuery('/api/search/artist',query.searchArtist,'post')
SQLQuery('/api/search/user',query.searchUser,'post')

SQLQuery('/api/permission/add',query.getUsersAddPermissions)
SQLQuery('/api/permission/canIncativateSong',query.getCanInactivateSongPermissions)
SQLQuery('/api/permission/update',query.UpdatePermission,'post')
SQLQuery('/api/permission/track/inactivate',query.getTrackPermissionINACTIVATE,'post')
SQLQuery('/api/permission/track/update',query.getTrackPermissionUPDATE,'post')
SQLQuery('/api/permission/track/delete',query.getTrackPermissionDELETE,'post')
SQLQuery('/api/permission/artist/update',query.getArtistPermissionUPDATE,'post')
SQLQuery('/api/permission/artist/delete',query.getArtistPermissionDELETE,'post')
SQLQuery('/api/permission/album/update',query.getAlbumPermissionUPDATE,'post')
SQLQuery('/api/permission/album/delete',query.getAlbumPermissionDELETE,'post')
SQLQuery('/api/trackstate',query.addtrackstate,'post')

SQLQuery('/api/reports/commongenre',query.getMostCommonGenres)
SQLQuery('/api/reports/commonartist',query.getMostCommonArtist)
SQLQuery('/api/reports/longestsong',query.getLongestSongsWithArtists)
SQLQuery('/api/reports/durationgenre',query.getDurationAverageByGenre)
SQLQuery('/api/reports/colaborativeartist',query.getMostColaborativeArtists)
SQLQuery('/api/reports/recentalbum',query.getRecentAlbums)
SQLQuery('/api/reports/morealbumadded',query.getUserwithmoreAlbumsAdded)
SQLQuery('/api/reports/moretrackadded',query.getUserwithmoreTracksAdded)
SQLQuery('/api/reports/playlistduration',query.getAllPlaylistByDuration)
SQLQuery('/api/reports/playlist_artist',query.getPlaylistByArtistCount)
SQLQuery('/api/reports/artist_genre',query.getArtistByGenreCount)

SQLQuery('/api/actions/inactivate',query.UpdateTrackState,'post')
SQLQuery('/api/actions/delete/track',query.deleteTrack,'post')
SQLQuery('/api/actions/delete/album',query.deleteAlbum,'post')
SQLQuery('/api/actions/delete/artist',query.deleteArtist,'post')

SQLQuery('/api/actions/update/getAlbumID',query.selectAlbumID,'post')
SQLQuery('/api/actions/update/getArtistID',query.selectARtistID,'post')
SQLQuery('/api/actions/update/medieaID',query.selectMediaID,'post')
SQLQuery('/api/actions/update/genereID',query.selectGenreID,'post')

SQLQuery('/api/actions/update/artist',query.UpdateArtist,'post')
SQLQuery('/api/actions/update/album',query.UpdateAlbum,'post')
SQLQuery('/api/actions/update/track',query.UpdateTrack,'post')

SQLQuery('/api/login',query.Login,'post')
SQLQuery('/api/logout',query.Logout,'post')


const port=8080;
app.listen(port,()=>console.log(`Server started on port ${port}`))