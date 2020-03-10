const express = require('express');
const pg = require('pg');
const app = express();

const pool = new pg.Pool({
    port: 5432,
    user: 'admin',
    password: 'admin',
    database: 'ProyectoBasedeDatos'
})
const SQLQuery = (apiRoute,Query) => {
    app.get(apiRoute,(req,res)=>{
        pool.connect((err,db,done)=>{
            if(err){
                return console.log(err)
            }
            db.query(Query,(err,table) => {
                done();
                if(err){
                    return console.log(err)
                }
                artists=table.rows
                res.json(artists)
                return table.rows
            })
        })
    });
}

SQLQuery('/api/artists','SELECT * FROM Artist')

const port=8080;
app.listen(port,()=>console.log(`Server started on port ${port}`))