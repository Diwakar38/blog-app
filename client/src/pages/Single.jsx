import React, { useContext, useState, useEffect } from 'react'
import Edit from "../img/edit.png"
import Delete from "../img/delete.png"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Menu from "../components/Menu"
import moment from "moment"
import axios from "axios"
import { AuthContext } from '../context/authContext'
import URL from "../Back.js"
const Single = () => {
	const [post, setPost] = useState([])
	const navigate = useNavigate()
	const location = useLocation();

	const postId = location.pathname.split("/")[2]
	// console.log(postId)
	const { currentUser } = useContext(AuthContext)


	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`${URL}/api/posts/${postId}`,{
          withCredentials : true
        })
				setPost(res.data)
			} catch (err) {
				console.log(err)
			}
		}
		fetchData();
	}, [postId]);

	const handleDelete = async () => {
		try {
			// console.log(access_token)
			await axios.delete(`${URL}/api/posts/${postId}`, {
				withCredentials: true
			});
			navigate("/")
		} catch (err) {
			console.log(err);
		}
	}


	const getText = (html) => {
		const doc = new DOMParser().parseFromString(html, "text/html")
		return doc.body.textContent
	}


	return (
		<div className='single'>
			<div className="content">
				<img src={`../upload/${post?.img}`} alt="userImage" />
				<div className="user">
					{post.userImg && <img src={post.userImg} alt="" />}
					<div className="info">
						<span>{post.username}</span>
						<p>Posted {moment(post.date).fromNow()}</p>
					</div>
					{currentUser && currentUser.username === post.username && (
						<div className="edit">
							<Link to={`/write?edit=2`} state={post}>
								<img src={Edit} alt="edit_icon" />
							</Link>
							<img onClick={handleDelete} src={Delete} alt="delete_icon" />
						</div>
					)}
				</div>
				<h1>{post.title}</h1>
				{getText(post.desc)}
			</div>
			<Menu cat={post.cat} />
		</div>
	)
}

export default Single
