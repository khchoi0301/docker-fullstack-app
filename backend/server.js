const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db");

const app = express();

app.use(bodyParser.json());

// table 생성
db.pool.query(
  `CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
)`,
  (err, results, fields) => {
    console.log("results",err, results);
  }
);

app.use((req,res,next)=>{
    console.log("backend", req.url)
    next()
})

// DB lists 테이블에 있는 모든 데이터 가져오기
app.get("/api/values", (req, res, next) => {
    console.log("api/values")
  db.pool.query(`SELECT * FROM lists;`, (err, results, fields) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.json(results);
    }
  });
});

// DB lists 테이블에 데이터 넣어주기
app.post("/api/value", (req, res, next) => {
    console.log("api/value")

  db.pool.query(
    `INSERT INTO lists (value) VALUES ("${req.body.value}")`,
    (err, results, fields) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.json({ success: true, value: req.body.value });
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Running on 5000");
});
