import React from "react"
import timespan from "../utils/timespan"
import publicUrl from "../utils/publicUrl"
import css from "./Post.module.css"

function Post(props){
    const user = props.user
    const post = props.post
    const likes = props.likes
    const comments = props.comments
    return (
        <div>
            <div className={css.postHeader}>
                <img src={publicUrl(user.photo)} className={css.profileImg} alt="Profile"></img>
                <div><b>{user.id}</b></div>
            </div>
            <img src={publicUrl(post.photo)} className={css.postImg} alt="Post"></img>
            <div className={css.postContent}>
                <div className={css.marginTop10}>
                    {likes.self ? (
                        <img src={publicUrl("/assets/unlike.svg")} className={css.marginRight10} alt="Unlike"></img>
                    ) : (
                        <img src={publicUrl("/assets/like.svg")} className={css.marginRight10} alt="Like"></img>
                    )}
                    <img src={publicUrl("/assets/comment.svg")} alt="Comment"></img>
                </div>
                <div className={css.marginTop10}>
                    <b>{likes.count} likes</b>
                </div>
                <div className={css.marginTop10}>
                    <div>
                        <b className={css.marginRight5}>{post.userId}</b>
                        {post.desc}
                    </div>
                    {comments.map(comment => {
                        return (
                            <div>
                                <b className={css.marginRight5}>{comment.userId}</b>
                                {comment.text} 
                            </div>
                        )
                    })}
                </div>
                <p className={`${css.marginTop10} ${css.timestamp}`}>{timespan(post.datetime).toUpperCase()} AGO</p>
            </div>
        </div>
    )
}

export default Post