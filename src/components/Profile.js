import React from "react"
import publicUrl from "../utils/publicUrl"
import css from "./Profile.module.css"
import PostThumbnail from "./PostThumbnail"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

function Profile(props){
  let {userId} = useParams()
  const {store} = props
  let currentUserId;
  if(userId){
    currentUserId = userId
  }else{
    currentUserId = store.currentUserId
  }
  const userInfo = store.users.find(user => user.id === currentUserId)
  const followers = store.followers.filter(follower => follower.userId === currentUserId)
  const following = store.followers.filter(follower => follower.followerId === currentUserId)
  const posts = store.posts.filter(post => post.userId === currentUserId)

  function handleFollow(e){
    props.onFollow(currentUserId, store.currentUserId)
  }

  function handleUnfollow(e){
    props.onUnfollow(currentUserId, store.currentUserId)
  }

  return (
    <div>
      <div className={css.userHeader}>
        <img src={publicUrl(userInfo.photo)} className={css.profileImg} alt="Profile"></img>
        <div className={css.userHeaderText}>
          <h2 className={css.username}>{currentUserId}</h2>
          {followers.map(follower => follower.followerId).includes(store.currentUserId) ? (
            <button onClick={(e) => handleUnfollow(e)} className={css.unfollowButton}>
              Unfollow
            </button>
          ) : (
            <button onClick={(e) => handleFollow(e)} className={css.followButton}>
              Follow
            </button>
          )}
        </div>
      </div>
      <div>
        <h4 className={css.nameBio}>{userInfo.name}</h4>
        <p className={css.nameBio}>{userInfo.bio}</p>
      </div>
      <hr className={css.divider} />
      <div className={css.userInfo}>
        <div className={css.userInfoCategory}>
          <p className={css.userInfoText}><b>{posts.length}</b></p>
          <p className={css.userInfoText}>posts</p>
        </div>
        <div className={css.userInfoCategory}>
          <p className={css.userInfoText}><b>{followers.length}</b></p>
          <p className={css.userInfoText}>followers</p>
        </div>
        <div className={css.userInfoCategory}>
          <p className={css.userInfoText}><b>{following.length}</b></p>
          <p className={css.userInfoText}>following</p>
        </div>
      </div>
      <div className={css.posts}>
        {posts.map(post => {
          return (
            <Link key={post.id} to={"/" + post.id}>
              <PostThumbnail post={post}/>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Profile