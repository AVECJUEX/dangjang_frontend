import React from 'react'
import './Feed.css'
// import StoryReel from "./StoryReel"
// import MessageSender from "./MessageSender"
import Post from "./Post"

function Feed() {
    return (
        <div className="feed">
            {/* <StoryReel />
            <MessageSender /> */}
            <Post
                profilePic = "https://t1.daumcdn.net/cfile/tistory/99DFAC4F5D3C33862B"
                message ="정경호!"
                timestamp ="this is timeStamp"
                username = "hwijeong"
                image = "https://t1.daumcdn.net/cfile/tistory/99DFAC4F5D3C33862B"
            />
            <Post
                profilePic = "https://t1.daumcdn.net/cfile/tistory/99DFAC4F5D3C33862B"
                message ="정경호!"
                timestamp ="this is timeStamp"
                username = "hwijeong"
                image = "https://t1.daumcdn.net/cfile/tistory/99DFAC4F5D3C33862B"
            />
            <Post
                profilePic = "https://t1.daumcdn.net/cfile/tistory/99DFAC4F5D3C33862B"
                message ="정경호!"
                timestamp ="this is timeStamp"
                username = "hwijeong"
                image = "https://t1.daumcdn.net/cfile/tistory/99DFAC4F5D3C33862B"
            />
        </div>
    )
}

export default Feed
