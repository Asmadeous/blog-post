import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../constants";
function PostDetails() {
    const [post, setPost] = useState([]);
    const { id } = useParams();

    useEffect (() => {
        const fetchCurrentPost = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                if (response.ok) {
                    const json = await response.json();
                    setPost(json);
                    // console.log(post)
                }else {
                    throw response;
                }
            } catch(e) {
                console.log("An error occured:", e)
            }
        };
        fetchCurrentPost();
    }, [id]);
    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to="/">Back to Posts</Link>
        </div>
    )
}

export default PostDetails;