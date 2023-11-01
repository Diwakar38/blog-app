import mysql from "mysql"

export const db = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12658492",
    password: "vjFVKyCFlM",
    database: "sql12658492"
});

db.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error);
    } else {
        console.log('Connected to the database');
    }
});
