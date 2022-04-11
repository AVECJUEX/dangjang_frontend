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



function TableRow(props){
  let history = useNavigate ();

  const refreshPage=()=>{ 
    window.location.reload(); 
  }

  const deleteItem = (e)=>{
      if(window.confirm("삭제하시겠습니까?"))
      {
        Axios.get('http://localhost:9090/board/delete/'+props.obj.id)
            .then(
              ()=>{
                console.log('Deleted');
                history('/board');
              }
            ).catch(err => console.log(err));
        refreshPage();
        console.log("delete");  
      }
  }
  
    return (
      <div className="post">
      {/* <div className="post__top">
          <Avatar src = {profilePic} className="post__avatar"/>
          <div className="post__topInfo">
              <h3>{user_id}</h3>
              <p>Timestamp...</p>
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

      </div> */}
  </div>
    );
  }
  

export default TableRow;