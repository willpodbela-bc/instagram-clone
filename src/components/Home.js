import React, { useContext } from "react"
import { StoreContext } from "../contexts/StoreContext"
import Post from "./Post"
import { useParams } from "react-router-dom"

function Home(props){
  let { posts, users, comments, likes, currentUserId, addComment, addLike, removeLike } = useContext(StoreContext)
  let {postId} = useParams()
  const currentPost = posts.filter(post => post.id === postId)[0]
  function findUser(post){
    return users.find(user => user.id === post.userId)
  }
  
  function findComments(post){
    return comments.filter(comment => comment.postId === post.id)
  }
  
  function findLikes(post){
    let postLikes = likes.filter(like => like.postId === post.id)
    return {
      self: postLikes.some(like => like.userId === currentUserId),
      count: postLikes.length
    }
  }
  
  return (
    <div>
      {currentPost ? (
        <div>
          <Post
            key={currentPost.id}
            user={findUser(currentPost)}
            post={currentPost}
            comments={findComments(currentPost)}
            likes={findLikes(currentPost)}
            onLike={addLike} 
            onUnlike={removeLike}
            onComment={addComment}
          />
        </div>
      ) : (
        <div>
          {posts.sort((a,b)=>new Date(b.datetime) - new Date(a.datetime))
          .map(post=>
            <Post
              key={post.id}
              user={findUser(post)}
              post={post}
              comments={findComments(post)}
              likes={findLikes(post)}
              onLike={addLike} 
              onUnlike={removeLike}
              onComment={addComment}
            />)}
        </div>
      )}
    </div>
  )
}

export default Home