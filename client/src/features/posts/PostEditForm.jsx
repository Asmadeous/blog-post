import { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router";
import { API_URL } from "../../constants";

function PostEditForm(){
    const [post,setPost] = useState(null)
    const {id} = useParams()
    const [,setLoading ] = useState(true);
    const [,setError] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                if (response.ok) {
                    const json = await response.json()
                    setPost(json)
                }else {
                    throw response
                }
            } catch(e) {
                console.log("An error occured", e)
                setError(e)
            } finally {
                setLoading(false)
            }
        }
        fetchCurrentPost()
    },[id]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${API_URL}/${id}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: post.title,
                    body: post.body
                })
            });
            if (response.ok) {
                const json = await response.json();
                console.log("Success", json)
                navigate(`/posts/${id}`)
            } else {
                throw response;
            }
        } catch (e) {
            console.log("An error occured", e)
        }
    };
    if (!post) return <h3>Loading...</h3>;

    return(
        <div>
            <h2>Edit post form here</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="post-title">Title:</label>
                    <input
                    id="post-title"
                    type="text"
                    value={post.title}
                    onChange={(e) => setPost({...post, title: e.target.value})}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="post-body">Body:</label>
                    <input
                    id="post-body"
                    type="text"
                    value={post.body}
                    onChange={(e) => setPost({...post, body: e.target.value})}
                    required
                    />
                </div>
                <div>
                    <button type="submit">Edit Post</button>
                </div>
            </form>
        </div>
        
    )
}

export default PostEditForm;