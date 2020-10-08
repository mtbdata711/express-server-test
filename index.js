
const express = require("express");
const app = express();
const sqlite3 = require('sqlite3').verbose();
const HTTP_PORT = 8000;
const DBSOURCE = "instagram.db";

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