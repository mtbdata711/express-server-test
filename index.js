
const express = require("express");
const app = express();
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors')
const HTTP_PORT = 8080;
const DBSOURCE = "instagram.db";

app.use(cors())

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if(err){
        console.log("connection failed...");
    }else{
        console.log("db connected...");
    }
});


app.get("/all", (req, res, next) => {
    const sql = "SELECT * FROM instagramCache";
    db.all(sql, [], (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }

        rows = rows.map( row => {
            return {
                id: row.id,
                college: row.college,
                created_at: row.created_at,
                last_updated: row.last_updated,
                last_updated_token: row.last_updated_token,
                status: row.cron_status,
                last_error: row.last_error,
                data: JSON.parse(row.cache)
            }
        });
        res.json({
            "message":"success",
            "data":rows
        })
      });
});



// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});