import React, { useContext } from "react"
import { StoreContext } from "../contexts/StoreContext"
import publicUrl from "../utils/publicUrl"
import css from "./Profile.module.css"
import PostThumbnail from "./PostThumbnail"
import { Link } from "react-router-dom"
import { useParams, Redirect } from "react-router-dom"

function Profile(props){
  let { posts, users, followers, currentUserId, addFollower, removeFollower } = useContext(StoreContext)
  let {userId} = useParams()
  console.log(users)
  let currentProfileId;
  if(userId){
    currentProfileId = userId
  }else{
    currentProfileId = currentUserId
  }
  const userInfo = users.find(user => user.id === currentProfileId)
  const currentFollowers = followers.filter(follower => follower.userId === currentProfileId)
  const following = followers.filter(follower => follower.followerId === currentProfileId)
  const currentPosts = posts.filter(post => post.userId === currentProfileId)

  function handleFollow(e){
    addFollower(currentProfileId, currentUserId)
  }

  function handleUnfollow(e){
    removeFollower(currentProfileId, currentUserId)
  }

  return (
    !userInfo? (
      <Redirect to="login" />
    ) : (
      <div>
        <div className={css.userHeader}>
          <img src={publicUrl(userInfo.photo)} className={css.profileImg} alt="Profile"></img>
          <div className={css.userHeaderText}>
            <h2 className={css.username}>{currentProfileId}</h2>
            {currentProfileId !== currentUserId &&
              <div>
                {currentFollowers.map(follower => follower.followerId).includes(currentUserId) ? (
                  <button onClick={(e) => handleUnfollow(e)} className={css.unfollowButton}>
                    Unfollow
                  </button>
                ) : (
                  <button onClick={(e) => handleFollow(e)} className={css.followButton}>
                    Follow
                  </button>
                )}
              </div>
            }
          </div>
        </div>
        <div>
          <h4 className={css.nameBio}>{userInfo.name}</h4>
          <p className={css.nameBio}>{userInfo.bio}</p>
        </div>
        <hr className={css.divider} />
        <div className={css.userInfo}>
          <div className={css.userInfoCategory}>
            <p className={css.userInfoText}><b>{currentPosts.length}</b></p>
            <p className={css.userInfoText}>posts</p>
          </div>
          <div className={css.userInfoCategory}>
            <p className={css.userInfoText}><b>{currentFollowers.length}</b></p>
            <p className={css.userInfoText}>followers</p>
          </div>
          <div className={css.userInfoCategory}>
            <p className={css.userInfoText}><b>{following.length}</b></p>
            <p className={css.userInfoText}>following</p>
          </div>
        </div>
        <div className={css.posts}>
          {currentPosts.map(post => {
            return (
              <Link key={post.id} to={"/" + post.id}>
                <PostThumbnail post={post}/>
              </Link>
            )
          })}
        </div>
      </div>
    )
  )
}

export default Profile