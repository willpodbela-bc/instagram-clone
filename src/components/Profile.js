import React from "react"
import publicUrl from "../utils/publicUrl"
import css from "./Profile.module.css"
import PostThumbnail from "./PostThumbnail"

function Profile(props){
  const {store} = props
  const currentUserId = store.currentUserId
  const userInfo = store.users.find(user => user.id === currentUserId)
  const numFollowers = store.followers.filter(follower => follower.userId === currentUserId).length
  const numFollowing = store.followers.filter(follower => follower.followerId === currentUserId).length
  const posts = store.posts.filter(post => post.userId === currentUserId)
  return (
    <div>
      <div className={css.userHeader}>
        <img src={publicUrl(userInfo.photo)} className={css.profileImg} alt="Profile"></img>
        <h2>{currentUserId}</h2>
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
          <p className={css.userInfoText}><b>{numFollowers}</b></p>
          <p className={css.userInfoText}>followers</p>
        </div>
        <div className={css.userInfoCategory}>
          <p className={css.userInfoText}><b>{numFollowing}</b></p>
          <p className={css.userInfoText}>following</p>
        </div>
      </div>
      <div className={css.posts}>
        {posts.map(post => {
          return (
            <div>
              <PostThumbnail post={post}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Profile