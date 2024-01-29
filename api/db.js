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

// export const db = mysql.createConnection({
//     host: "btudl4ng9x3bh7yvg5ej-mysql.services.clever-cloud.com",
//     user: "utp21egfd5urcbw4",
//     password: "uWRrFIx61LQYR8bU6ClG",
//     database: "btudl4ng9x3bh7yvg5ej"
// });

db.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error);
    } else {
        console.log('Connected to the database');
    }
});