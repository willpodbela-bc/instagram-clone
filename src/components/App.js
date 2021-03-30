import React, { useState } from "react"
import css from "./App.module.css"
import Header from "./Header"
import Home from "./Home"
import Navbar from "./Navbar"
import Explore from "./Explore"
import NewPost from "./NewPost"
import Activity from "./Activity"
import Profile from "./Profile"
import initialStore from "../utils/initialStore"
import uniqueId from "../utils/uniqueId"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App(){
  const [store, setStore] = useState(initialStore)

  function addComment(postId, text){
    const comment = {
      userId: store.currentUserId, 
      postId,
      text,
      datetime: new Date().toISOString()
    }
    setStore({
      ...store,
      comments:store.comments.concat(comment)
    })
  }

  function addLike(postId){
    const like = {
      userId: store.currentUserId, 
      postId,
      datetime: new Date().toISOString()
    }
    setStore({
      ...store,
      likes: store.likes.concat(like)
    })
  }

  function removeLike(postId){
    setStore({
      ...store,
      likes: store.likes.filter(like => !(like.userId === store.currentUserId && like.postId === postId))
    })
  }

  function addPost(photo, desc){
    const post = {
      id: uniqueId("post"),
      userId: store.currentUserId,
      photo: photo,
      desc: desc,
      datetime: new Date().toISOString()
    }
    setStore({
      ...store,
      posts: store.posts.concat(post)
    })
  }

  function addFollower(userId, followerId){
    const follower = {
      userId: userId,
      followerId: followerId
    }
    setStore({
      ...store,
      followers: store.followers.concat(follower)
    })
  }

  function removeFollower(userId, followerId){
    const follower = {
      userId: userId,
      followerId: followerId
    }
    setStore({
      ...store,
      followers: store.followers.filter(follower => !(follower.userId === userId && follower.followerId === followerId))
    })
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className={css.container}>
        <Header/>
        <main className={css.content}>
          <Switch>
            <Route path="/explore">
              <Explore/>
            </Route>
            <Route path="/newpost">
              <NewPost
                store={store}
                addPost={addPost}/>
            </Route>
            <Route path="/activity">
              <Activity/>
            </Route>
            <Route path="/profile/:userId?">
              <Profile store={store}
                       onFollow={addFollower}
                       onUnfollow={removeFollower}/>
            </Route>
            <Route path="/:postId?">
              <Home store={store}
                    onLike={addLike}
                    onUnlike={removeLike}
                    onComment={addComment}/>
            </Route>
          </Switch>
        </main>
        <Navbar/>
      </div>
    </Router>
  )
}

export default App
