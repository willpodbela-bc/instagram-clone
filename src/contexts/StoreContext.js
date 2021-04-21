import React, {createContext, useState, useEffect} from "react"
import { useHistory } from "react-router-dom"
import uniqueId from "../utils/uniqueId"
import firebase from "firebase"
import "firebase/auth"
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyA2cbOl39zfCQsn9nGSfjJ2BfosYJWo3yQ",
  authDomain: "myproject-de1a7.firebaseapp.com",
  datebaseURL: "",
  projectId: "myproject-de1a7",
  storageBucket: "myproject-de1a7.appspot.com",
  messagingSenderId: "2641774622",
  appId: "1:2641774622:web:ae0a8ad8681a247af0860f"
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const auth = firebase.auth()

// export the context so that other components can import
export const StoreContext = createContext()

function StoreContextProvider(props){
    const [currentUserId, setCurrentUserId] = useState(null) // or 'judy'
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [likes, setLikes] = useState([])
    const [followers, setFollowers] = useState([])
    const [comments, setComments] = useState([])
    const history = useHistory()

    useEffect(()=>{// initialization
      db.collection("users").get().then(snapshot=>{
        const users = snapshot.docs.map(d=>d.data())
        setUsers(users)
      })
      db.collection("posts").get().then(snapshot=>{
        const posts = snapshot.docs.map(d=>d.data())
        setPosts(posts)
      })
      db.collection("likes").get().then(snapshot=>{
        const likes = snapshot.docs.map(d=>d.data())
        setLikes(likes)
      })
      db.collection("followers").get().then(snapshot=>{
        const followers = snapshot.docs.map(d=>d.data())
        setFollowers(followers)
      })
      db.collection("comments").get().then(snapshot=>{
        const comments = snapshot.docs.map(d=>d.data())
        setComments(comments)
      })
    }, []) // second argument to [] to be called only once

    function login(email, password){
      auth.signInWithEmailAndPassword(email,password).then((response)=>{
        db.collection("users")
          .where("email", "==", response.user.email)
          .get()
          .then(snapshot=>{
            setCurrentUserId(snapshot.docs[0].data().id)
        })
        history.push("/")
      }).catch(error=>{
        setCurrentUserId(null)
      })
    }

    function signup(email, password, bio, id, name, photo){
      const user = {
        email, id, name, bio, photo
      }
      auth.createUserWithEmailAndPassword(email, password).then(()=>{
        // add a user to the firestore database
        db.collection("users").add(user)
        // add a user to the app state
        setUsers(users.concat(user))
        // set the user as a current user 
        setCurrentUserId(id)
        // route to home
        history.push("/")
      })
    }

    function addComment(postId, text){
        const comment = {
          userId: currentUserId, 
          postId,
          text,
          datetime: new Date().toISOString()
        }
        setComments(comments.concat(comment))
        db.collection("comments").add(comment)
    }
    
    function addLike(postId){
        const like = {
          userId: currentUserId, 
          postId,
          datetime: new Date().toISOString()
        }
        setLikes(likes.concat(like))
        db.collection("likes").add(like)
    }
    
    function removeLike(postId){
        setLikes(likes.filter(like => !(like.userId === currentUserId && like.postId === postId)))
        db.collection("likes")
          .where("userId", "==", currentUserId)
          .where("postId", "==", postId)
          .get()
          .then(snapshot=>snapshot.forEach(doc=>doc.ref.delete()))
    }
    
    function addPost(photo, desc){
        const post = {
          id: uniqueId("post"),
          userId: currentUserId,
          photo: photo,
          desc: desc,
          datetime: new Date().toISOString()
        }
        setPosts(posts.concat(post))
        db.collection("posts").add(post)
    }
    
    function addFollower(userId, followerId){
        const follower = {
          userId: userId,
          followerId: followerId
        }
        setFollowers(followers.concat(follower))
        db.collection("followers").add(follower)
    }
    
    function removeFollower(userId, followerId){
        setFollowers(followers.filter(follower => !(follower.userId === userId && follower.followerId === followerId)))
        db.collection("followers")
          .where("userId", "==", userId)
          .where("followerId", "==", followerId)
          .get()
          .then(snapshot=>snapshot.forEach(doc=>doc.ref.delete()))
    }

    return (
        <StoreContext.Provider value = {{currentUserId, users, posts, likes, comments, followers, login, signup, addComment, addLike, removeLike, addPost, addFollower, removeFollower}}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider