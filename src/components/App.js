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

function App(props){
  const [page, setPage] = useState("home")
  const [store, setStore] = useState(initialStore)

  function renderMain(page){
    switch(page){
      case "home": return (
        <Home
          store={store}
          onLike={addLike} 
          onUnlike={removeLike}
          onComment={addComment}
        />
      )
      case "explore": return <Explore/>
      case "newPost": return (
        <NewPost
          store={store}
          addPost={addPost}
          cancelPost={cancelPost}
        />
      )
      case "activity": return <Activity/>
      case "profile": return <Profile store={store} />
      default: return (
        <Home
          store={store}
          onLike={addLike} 
          onUnlike={removeLike}
          onComment={addComment}
        />
      )
    }
  }

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
      likes: store.likes.filter(like=>!(like.userId===store.currentUserId && like.postId===postId))
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
    setPage("home")
  }

	function cancelPost(){
		setPage("home")
	}	

  return (
    <div className={css.container}>
      <Header/>
      <main className={css.content}>
        {renderMain(page)}
      </main>
      <Navbar onNavChange={setPage}/>
    </div>
  )
}

export default App
