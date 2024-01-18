const express = require("express");
const cors = require("cors");
const app = express();
const port = 5470;
const quizRoute = require("./Router/quiz");
const jobsheetRoute = require("./Router/jobsheet");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./Models");
db.sequelize.sync();

app.get("/", (r, s) => {
  s.send("Quiz ExpressJS API By Satoriya Kobayashi");
});

app.use("/api/quizzes", quizRoute);
app.use("/api/jobsheet", jobsheetRoute);

app.listen(port, () =>
  console.log("listening on port http://localhost:" + port + "!")
);
