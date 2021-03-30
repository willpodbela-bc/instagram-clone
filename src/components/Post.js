import React, { useState } from "react"
import timespan from "../utils/timespan"
import publicUrl from "../utils/publicUrl"
import css from "./Post.module.css"
import { Link } from "react-router-dom"

function Post(props){
    const [comment, setComment] = useState("")
    const [toggleComment, setToggleComment] = useState(false)
    const user = props.user
    const post = props.post
    const likes = props.likes
    const comments = props.comments
    
    function handleUnlike(e){
        props.onUnlike(props.post.id)
    }
    
    function handleLike(e){
        props.onLike(props.post.id)
    }

    function handleSubmitComment(event){
        props.onComment(props.post.id, comment)
        setComment("")
        setToggleComment(false)
        event.preventDefault()
    }

    return (
        <div>
            <Link to={"/profile/" + user.id}>
                <div className={css.postHeader}>
                    <img src={publicUrl(user.photo)} className={css.profileImg} alt="Profile"></img>
                    <div><b>{user.id}</b></div>
                </div>
            </Link>
            <img src={publicUrl(post.photo)} className={css.postImg} alt="Post"></img>
            <div className={css.postContent}>
                <div className={css.marginTop10}>
                    {likes.self ? (
                        <img onClick={(e) => handleUnlike(e)} src={publicUrl("/assets/unlike.svg")} className={css.marginRight10} alt="Unlike" name="Unlike"></img>
                    ) : (
                        <img onClick={(e) => handleLike(e)} src={publicUrl("/assets/like.svg")} className={css.marginRight10} alt="Like" name="Like"></img>
                    )}
                    <button onClick={e => setToggleComment(!toggleComment)}>
                        <img src={publicUrl("/assets/comment.svg")} alt="Comment"></img>
                    </button>
                </div>
                <div className={css.marginTop10}>
                    <b>{likes.count} likes</b>
                </div>
                <div className={css.marginTop10}>
                    <div>
                        <Link to={"/profile/" + post.userId}>
                            <b className={css.marginRight5}>{post.userId}</b>
                        </Link>
                        {post.desc}
                    </div>
                    {comments.map(comment => {
                        return (
                            <div>
                                <Link to={"/profile/" + comment.userId}>
                                    <b className={css.marginRight5}>{comment.userId}</b>
                                </Link>
                                {comment.text} 
                            </div>
                        )
                    })}
                </div>
                <p className={`${css.marginTop10} ${css.timestamp}`}>{timespan(post.datetime).toUpperCase()} AGO</p>
            </div>
            {toggleComment && 
                <form className={css.addComment} onSubmit={handleSubmitComment}>
                    <input type="text" placeholder="Add a comment..." value={comment} onChange={e => setComment(e.target.value)}/>
                    <button type="submit">Post</button>
                </form>
            }
        </div>
    )
}

export default Post