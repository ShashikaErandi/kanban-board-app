const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "kanban_board"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM metrics";
    db.query(sqlSelect, (err, result)=>{
        res.send(result);
    });
});

app.post("/api/insert", (req, res) => {

    const metric = req.body.metric
    const status = req.body.status

    const sqlInsert = "INSERT INTO metrics (value, metricStatus) VALUES(?,?)"
    db.query(sqlInsert, [metric, status], (err, result)=>{
        console.log(result);
    })
});

app.listen(3001, () => {
    console.log("running on port 3001");
});