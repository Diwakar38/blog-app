import mysql from "mysql"

export const db = mysql.createConnection({
  host: "localhost",
  user: "Project",
  password: "12345678",
  database: "blog"
});

// export const db = mysql.createConnection({
//     host: "sql12.freesqldatabase.com",
//     user: "sql12658492",
//     password: "vjFVKyCFlM",
//     database: "sql12658492"
// });