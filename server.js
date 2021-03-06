const query = require('./queries')
const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser')
const app = express();
const session = require('express-session');
var cookieSession = require('cookie-session')

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


const pool = new pg.Pool({
    port: 5432,
    user: 'admin',
    password: 'admin',
    database: 'ProyectoBasedeDatosFinal'
})
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(cookieSession({
    name: 'session',
    keys: ['DB'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


app.post('/api/purchase', (request, response) => {
    const entry = {
        'client': request.body.client,
        'song': request.body.song,
        'date': request.body.date
    }
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("mydb");
        dbo.collection("customers").insertOne(entry, function (err, res) {
            if (err) {
                console.log(err, 'Something went wrong')
            }
            ;
            db.close();
        });
    });
    return response.status(200).send({
        'succes': true,
        'entry': entry
    })
})

app.post('/api/lookup', (request, response) => {
    const dateToLook = {
        'date': request.body.date
    }
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("mydb");
        return dbo.collection("customers").find(dateToLook).toArray(function (err, result) {
            db.close();
            if (err) {
                return response.status(400)
            }
            return response.status(200).send({
                'succes': true,
                'result': result
            })
        });
    });
})

app.get('/api/getLatest', (request, response) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("mydb");
        return dbo.collection("customers").find({}).limit(10).sort({'date': -1}).toArray(function (err, result) {
            db.close();
            if (err) {
                return response.status(400)
            }
            return response.status(200).send({
                'succes': true,
                'result': result
            })
        });
    });
})

const SQLQuery = (apiRoute, Query, method = 'get') => {
    switch (method) {
        case 'get':
            app.get(apiRoute, (request, res) => {
                pool.connect((err, db, done) => {
                    if (err) {
                        return res.status(400).send(err)
                    }
                    db.query(Query, (err, table) => {
                        done();
                        if (err) {
                            return res.status(400).send(err)
                        }
                        return res.status(201).send(table.rows)
                    })
                })
            });
            break;
        case 'post':
            app.post(apiRoute, function (request, response) {
                const values = Object.values(request.body)
                pool.connect((err, db, done) => {
                    done()
                    if (err) {
                        return response.status(400).send(err)
                    } else {
                        db.query(Query, values, (req, res) => {
                            console.log(Query, values)
                            if (err) {
                                console.log('err', err)
                                return response.status(400).send(err)
                            } else {
                                console.log('req', req)
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

SQLQuery('/api/media', query.getAllMediaType)
SQLQuery('/api/user', query.getAllUsers)
SQLQuery('/api/artist', query.getAllArtist)
SQLQuery('/api/genre', query.getAllGenre)
SQLQuery('/api/album', query.getAllAlbum)
SQLQuery('/api/playlist', query.getAllPlaylist)
SQLQuery('/api/checkuser', query.getUserByUsername, 'post')
SQLQuery('/api/checkusername', query.checkUserByUsername, 'post')
SQLQuery('/api/adduser', query.addUser, 'post')
SQLQuery('/api/addpermission', query.addUserPermission, 'post')
SQLQuery('/api/tracks', query.getSongs, 'post')
SQLQuery('/api/tracknames', query.getAllTrackData)

SQLQuery('/api/newuserid', query.getLastUserId)
SQLQuery('/api/newartistid', query.getLastArtistId)
SQLQuery('/api/newalbumid', query.getLastAlbumId)
SQLQuery('/api/newtrackid', query.getLastTrackId)
SQLQuery('/api/boughtTracks', query.getBoughtTracks, 'post')
SQLQuery('/api/cart', query.getCart)
SQLQuery('/api/binnacle', query.getBinnacle)
SQLQuery('/api/customer', query.getCustomer)

SQLQuery('/api/sim', query.addSimulation, 'post')
SQLQuery('/api/sim/line', query.addSimulationAction, 'post')

SQLQuery('/api/playist/add', query.createPlaylist, 'post')
SQLQuery('/api/playist/update', query.updatePlaylist, 'post')
SQLQuery('/api/playist/delete', query.deletePlaylist, 'post')

SQLQuery('/api/getsongs', query.getAllSongs),
SQLQuery('/api/getalbums', query.getAllAlbum),
SQLQuery('/api/play', query.playTrack, 'post')

SQLQuery('/api/newArtist', query.addArtist, 'post')
SQLQuery('/api/newAlbum', query.addAlbum, 'post')
SQLQuery('/api/newTrack', query.addTrack, 'post')
SQLQuery('/api/useralbum', query.addUserAlbum, 'post')
SQLQuery('/api/userartist', query.addUserArtist, 'post')
SQLQuery('/api/usertrack', query.addUserTrack, 'post')
SQLQuery('/api/addcart', query.addCart, 'post')
SQLQuery('/api/updatecart', query.updateCart, 'post')
SQLQuery('/api/buy', query.buy, 'post')
SQLQuery('/api/invoice', query.invoice, 'post')
SQLQuery('/api/invoices', query.invoices, 'post')

SQLQuery('/api/search/track', query.searchTrack, 'post')
SQLQuery('/api/search/album', query.searchAlbum, 'post')
SQLQuery('/api/search/artist', query.searchArtist, 'post')
SQLQuery('/api/search/user', query.searchUser, 'post')

SQLQuery('/api/permission/add', query.getUsersAddPermissions)
SQLQuery('/api/permission/canIncativateSong', query.getCanInactivateSongPermissions)
SQLQuery('/api/permission/update', query.UpdatePermission, 'post')
SQLQuery('/api/permission/track/inactivate', query.getTrackPermissionINACTIVATE, 'post')
SQLQuery('/api/permission/track/update', query.getTrackPermissionUPDATE, 'post')
SQLQuery('/api/permission/track/delete', query.getTrackPermissionDELETE, 'post')
SQLQuery('/api/permission/artist/update', query.getArtistPermissionUPDATE, 'post')
SQLQuery('/api/permission/artist/delete', query.getArtistPermissionDELETE, 'post')
SQLQuery('/api/permission/album/update', query.getAlbumPermissionUPDATE, 'post')
SQLQuery('/api/permission/album/delete', query.getAlbumPermissionDELETE, 'post')
SQLQuery('/api/trackstate', query.addtrackstate, 'post')

SQLQuery('/api/reports/commongenre', query.getMostCommonGenres)
SQLQuery('/api/reports/commonartist', query.getMostCommonArtist)
SQLQuery('/api/reports/longestsong', query.getLongestSongsWithArtists)
SQLQuery('/api/reports/durationgenre', query.getDurationAverageByGenre)
SQLQuery('/api/reports/colaborativeartist', query.getMostColaborativeArtists)
SQLQuery('/api/reports/recentalbum', query.getRecentAlbums)
SQLQuery('/api/reports/morealbumadded', query.getUserwithmoreAlbumsAdded)
SQLQuery('/api/reports/moretrackadded', query.getUserwithmoreTracksAdded)
SQLQuery('/api/reports/playlistduration', query.getAllPlaylistByDuration)
SQLQuery('/api/reports/playlist_artist', query.getPlaylistByArtistCount)
SQLQuery('/api/reports/artist_genre', query.getArtistByGenreCount)
SQLQuery('/api/reports/getweeklysales', query.getWeeklySales, 'post')
SQLQuery('/api/reports/weeklysales', query.weeklySales, 'post')
SQLQuery('/api/reports/getmostsoldartists', query.getMostSoldArtists, 'post')
SQLQuery('/api/reports/mostsoldartists', query.mostSoldArtists, 'post')
SQLQuery('/api/reports/getmostsoldgenres', query.getMostSoldGenres, 'post')
SQLQuery('/api/reports/mostsoldgenres', query.mostSoldGenres, 'post')
SQLQuery('/api/reports/getartistreproductions', query.getArtistReproductions, 'post')
SQLQuery('/api/reports/artistreproductions', query.artistReproductions, 'post')

SQLQuery('/api/actions/inactivate', query.UpdateTrackState, 'post')
SQLQuery('/api/actions/delete/before/track', query.BeforeDeleteTrack, 'post')
SQLQuery('/api/actions/delete/track', query.deleteTrack, 'post')
SQLQuery('/api/actions/delete/before/album', query.BeforeDeleteAlbum, 'post')
SQLQuery('/api/actions/delete/album', query.deleteAlbum, 'post')
SQLQuery('/api/actions/delete/before/artist', query.BeforeDeleteArtist, 'post')
SQLQuery('/api/actions/delete/artist', query.deleteArtist, 'post')

SQLQuery('/api/actions/update/getAlbumID', query.selectAlbumID, 'post')
SQLQuery('/api/actions/update/getArtistID', query.selectARtistID, 'post')
SQLQuery('/api/actions/update/medieaID', query.selectMediaID, 'post')
SQLQuery('/api/actions/update/genereID', query.selectGenreID, 'post')

SQLQuery('/api/actions/update/artist', query.UpdateArtist, 'post')
SQLQuery('/api/actions/update/album', query.UpdateAlbum, 'post')
SQLQuery('/api/actions/update/track', query.UpdateTrack, 'post')

SQLQuery('/api/login', query.Login, 'post')
SQLQuery('/api/logout', query.Logout, 'post')


const port = 8080;
app.listen(port, () => console.log(`Server started on port ${port}`))