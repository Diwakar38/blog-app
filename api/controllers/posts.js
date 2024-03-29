import { db } from "../db.js"
import jwt from "jsonwebtoken"

export const getPosts = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts";
    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).send(err)

        return res.status(200).json(data);
    })
}

export const getPost = (req, res) => {
    const q = "SELECT p.id, `username`, `title`, `desc`,p.img, u.image AS userImg,`cat`,`date` FROM user u JOIN posts p ON u.id = p.uid WHERE p.id = ?";


    db.query(q, [req.params.id], (err, data) => {
        // console.log("test");
        // console.log(err);
        if (err) return res.status(500).json(err)
        // console.log(data[0])

        return res.status(200).json(data[0])
    })
}

export const addPost = (req, res) => {
    const token = req.cookies.access;
    console.log("heyy");
    console.log(token);
    if (!token) return res.status(401).json("Not authenticated, no cookies")
    jwt.verify(token, "secretjwtkey", (err, userInfo) => {
        if (err) return res.status(401).json("Token is not valid!!")

        const q = "INSERT INTO posts(`title`,`desc`,`img`,`date`,`uid`,`cat`) VALUES (?)"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.date,
            userInfo.id,
            req.body.cat,
        ]

        console.log(values);

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            console.log("Inside addPost db query function");
            return res.status(200).json("Post has been created.");
        });
    })
}

export const deletePost = (req, res) => {
    // console.log(req.cookies)
    const token = req.cookies.access;
    // console.log(token);
    if (!token) return res.status(401).json("Not authenticated")
    jwt.verify(token, "secretjwtkey", (err, userInfo) => {
        if (err) return res.status(401).json("Token is not valid!!")

        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"

        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("Post can't be deleted by you!")

            return res.status(200).json("Post deleted successfully");
        })
    })
}

export const updatePost = (req, res) => {
    const token = req.cookies.access;
    // console.log(token);
    if (!token) return res.status(401).json("Not authenticated")
    jwt.verify(token, "secretjwtkey", (err, userInfo) => {
        if (err) return res.status(401).json("Token is not valid!!")

        const postId = req.params.id;
        const q = "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ? "

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
        ]

        db.query(q, [...values, postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)

            return res.json("Post has been updated")
        })
    })
}