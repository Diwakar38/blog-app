import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import URL from "../Back.js"

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`${URL}/api/upload`, formData, {withCredentials : true});
      return res.data;
    } catch (err) {
      // console.log("HEY");
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    
    try {
      state ? await axios.put(`${URL}/api/posts/${state.id}`, {
        title, desc: value, cat, img: file ? imgUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
			}, {
        withCredentials: true
			}) : await axios.post(`${URL}/api/posts/`, {
        title, desc: value, cat, img: file ? imgUrl : "",
				date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
			}, {
        withCredentials: true
			})
      // console.log("hey");
			navigate("/")
		} catch (err) {
			console.log(err);
		}
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
						<input type="radio" checked={cat === "C++"} name="C++" value="C++" id="C++" onChange={e => setCat(e.target.value)} />
						<label htmlFor="C++"> C++</label>
					</div>
					<div className="cat">
						<input type="radio" checked={cat === "SQL"} name="SQL" value="SQL" id="SQL" onChange={e => setCat(e.target.value)} />
						<label htmlFor="SQL"> SQL</label>
					</div>
					<div className="cat">
						<input type="radio" checked={cat === "JS"} name="JS" value="JS" id="JS" onChange={e => setCat(e.target.value)} />
						<label htmlFor="JS"> JS</label>
					</div>
					<div className="cat">
						<input type="radio" checked={cat === "CP"} name="CP" value="CP" id="CP" onChange={e => setCat(e.target.value)} />
						<label htmlFor="CP"> CP</label>
					</div>
					<div className="cat">
						<input type="radio" checked={cat === "CS"} name="CS" value="CS" id="CS" onChange={e => setCat(e.target.value)} />
						<label htmlFor="CS"> CS</label>
					</div>
        </div>
      </div>
    </div>
  );
};

export default Write;
