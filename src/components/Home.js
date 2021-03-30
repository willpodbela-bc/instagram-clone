import React from "react"
import Post from "./Post"
import { useParams } from "react-router-dom"

function Home(props){
  let {postId} = useParams()
  const {store} = props
  const currentPost = store.posts.filter(post => post.id === postId)[0]
  function findUser(post, store){
    return store.users.find(user => user.id === post.userId)
  }
  
  function findComments(post, store){
    return store.comments.filter(comment => comment.postId === post.id)
  }
  
  function findLikes(post, store){
    let postLikes = store.likes.filter(like => like.postId === post.id)
    return {
      self: postLikes.some(like => like.userId === store.currentUserId),
      count: postLikes.length
    }
  }
  
  return (
    <div>
      {currentPost ? (
        <div>
          <Post
            key={currentPost.id}
            user={findUser(currentPost, store)}
            post={currentPost}
            comments={findComments(currentPost, store)}
            likes={findLikes(currentPost, store)}
            onLike={props.onLike} 
            onUnlike={props.onUnlike}
            onComment={props.onComment}
          />
        </div>
      ) : (
        <div>
          {store.posts.sort((a,b)=>new Date(b.datetime) - new Date(a.datetime))
          .map(post=>
            <Post
              key={post.id}
              user={findUser(post, store)}
              post={post}
              comments={findComments(post, store)}
              likes={findLikes(post, store)}
              onLike={props.onLike} 
              onUnlike={props.onUnlike}
              onComment={props.onComment}
            />)}
        </div>
      )}
    </div>
  )
}

export default Home