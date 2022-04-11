import React from 'react';
import {Avatar} from '@material-ui/core';
import { useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Post.css";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NearMeIcon from '@material-ui/icons/NearMe';
import { ExpandMoreOutlined } from "@material-ui/icons";
import Axios from "axios";


/**
 free_seq={free_seq}
                title= {title}
                content={content}
                user_id={user_id}
                user_seq={user_seq}
                hit={hit}
                wdate={wdate}
 */

function Post({user_id, title, content, image, wdate, like_cnt, hit, user_seq}) {
    let history = useNavigate ();
    let { free_seq } = useParams();

   

    useEffect(()=>{
      console.log("[Post----free_seq----]",free_seq);
    },[]);

   
    return (
        <div className="post">
            <div className="post__top">
                <Avatar src = {image} className="post__avatar"/>
                <div className="post__topInfo">
                    <h3>{user_id}</h3>
                    <p>{wdate}</p>
                </div>
            </div>

            <div className="post__bottom">
                <p>{content}</p>
            </div>
            
            <div className="post__image">
                <img src={image} alt=""/>
            </div>

            <div className="post__options">
                <div className="post__option">
                    <ThumbUpIcon />
                    <p>Like</p>
                </div>

                <div className="post__option">
                    <ChatBubbleOutlineOutlinedIcon/>
                   <Link to="freeboard/view"> <p>Comment</p></Link>
                </div>

                <div className="post__option">
                    <NearMeIcon/>
                    <p>Share</p>
                </div>

                <div className="post__option">
                    <AccountCircleIcon />
                    <ExpandMoreOutlined />
                </div>

            </div>
        </div>
    )
}

export default Post
