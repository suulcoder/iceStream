const express = require('express');
const pg = require('pg');
const app = express();

app.use(function(request,response,next){
    response.header("Access-Control-Allow-Origin","*");
    response.header("Access-Control-Allos-Headers","Origin, X-Requested-With,Content-Type")
})

const pool = new pg.Pool({
    port: 5432,
    user: 'admin',
    password: 'admin',
    database: 'ProyectoBasedeDatos'
})
const SQLQuery = (apiRoute,Query,method='get') => {
    switch (method) {
        case 'get':
            app.get(apiRoute,(req,res)=>{
                pool.connect((err,db,done)=>{
                    if(err){
                        return response.status(400).send(err)
                    }
                    db.query(Query,(err,table) => {
                        done();
                        if(err){
                            return response.status(400).send(err)
                        }
                        artists=table.rows
                        res.json(artists)
                        return table.rows
                    })
                })
            });
        case 'post':
            const values = Object.values(request.body)
            app.post(apiRoute,function(request,response){
                pool.connect((err,db,done)=>{
                    if(err){
                        return response.status(400).send(err)
                    }
                    else{
                        db.query(Query,values,(req,res) => {
                            done()
                            if(err){
                                return response.status(400).send(err)
                            }
                            else{
                                db.end()
                                response.status(201).send({message: 'DATA INSERTED!'})
                            }
                        })
                    }
                })
            });
    }
}
SQLQuery('/api/user','SELECT * FROM User')
SQLQuery('/api/artists','SELECT * FROM Artist')
SQLQuery('/api/newArtist',"INSERT INTO Artist (ArtistId, Name) VALUES ($1,$2);",'post')
SQLQuery('api/newAlbum',"INSERT INTO Album (AlbumId, Title, ArtistId) VALUES ($1,$2,$3);",'post')
SQLQuery('/api/newTrack',"INSERT INTO Track (TrackId, Name, AlbumId, MediaTypeId, GenreId, Composer, Milliseconds, Bytes, UnitPrice) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);",'post')
const port=8080;
app.listen(port,()=>console.log(`Server started on port ${port}`))