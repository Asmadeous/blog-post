import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deletePost, fetchPost } from "../../services/PostService";
function PostDetails() {
    const [post, setPost] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect (() => {
        const fetchCurrentPost = async () => {
            try {
                const post = await fetchPost(id)
                setPost(post)
            } catch(e) {
                console.log("An error occured:", e)
            }
        };
        fetchCurrentPost();
    }, [id]);

    const deletePosts = async () => {
        try {
            await deletePost(post.id);
            navigate("/")
        }
        catch (e) {
            console.error("Failed to delete the post:", e)
        }
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            {" | "}
            <Link to="/">Back to Posts</Link>
            {" | "}
            <button onClick={deletePosts}>Delete</button>
        </div>
    )
}

export default PostDetails;