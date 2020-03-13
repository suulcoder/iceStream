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
                            console.log(Query,values)
                            if(err){
                                return response.status(400).send(err)
                            }
                            else{
                                console.log("data inserted")
                                return response.status(201).send(res)
                            }
                        })
                    }
                })
            });
    }
    return null
}
SQLQuery('/api/user',query.getAllUsers)
SQLQuery('/api/permission','SELECT * FROM UserPermissions')
SQLQuery('/api/genre',query.getAllGenre)
SQLQuery('/api/checkuser',query.getUserByUsername)
SQLQuery('/api/adduser',query.addUser,'post')
SQLQuery('/api/newuserid',query.getLastUserId)
SQLQuery('/api/permission/add',query.getUsersAddPermissions)
SQLQuery('/api/permission/canIncativateSong',query.getCanInactivateSongPermissions)
SQLQuery('/api/report/mostColaborative',query.getMostColaborativeArtists)
SQLQuery('/api/report',query.getMostColaborativeArtists)
SQLQuery('/api/newArtist',query.addArtist,'post')
SQLQuery('api/newAlbum',query.addAlbum,'post')
SQLQuery('/api/newTrack',query.addTrack,'post')
const port=8080;
app.listen(port,()=>console.log(`Server started on port ${port}`))