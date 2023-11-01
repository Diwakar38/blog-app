import { db } from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const normalAuth = (req, res) => {
    // Check db connection

    const sqlQuery = 'SELECT * FROM user';

    db.query(sqlQuery, (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
        } else {
            console.log('Query results:', results);
        }
    });

    res.json("This is auth homepage")
}

export const registerUser = (req, res) => {
    // Check existing user
    const q = "SELECT * FROM user WHERE email = ? OR username = ?";

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");

        //Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO user(`username`,`email`,`password`) VALUES (?)";
        const values = [req.body.username, req.body.email, hash];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
        });
    });

}

export const loginUser = (req, res) => {
    // Check user if it exists
    const q = "SELECT * FROM user WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length === 0) {
            return res.status(404).json("User not found!");
        }

        // If user exists then we check for the correct password
        const isPassCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if (!isPassCorrect) {
            return res.status(400).json("Wrong username or password!");
        }

        const token = jwt.sign({ id: data[0].id }, "secretjwtkey");

        // Set the cookie in the response
        res.cookie("access", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 2629800000),
            // Add other options like secure and domain if needed
        });

        // Return user data without the password
        const { password, ...userWithoutPassword } = data[0];
        return res.status(200).json(userWithoutPassword);
    });
};

export const logoutUser = (req, res) => {
    res.clearCookie("access").status(200).json("user has been logged out!")
}
