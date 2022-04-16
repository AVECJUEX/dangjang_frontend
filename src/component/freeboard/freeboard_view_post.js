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
import axios from "axios";
import Like_insert from './util/Like_insert';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useUserState } from "../member/UserContext";


function ViewPost({post, setPost}) {
    const { user } = useUserState();
    let history = useNavigate (); //자바스크립트 : history.go(-1)

    const [login_id, setLoginId] = useState("");
    const [login_seq, setLoginSeq] = useState("");
    const {free_seq, title, content, image, wdate, userid, like_cnt, click } = post;

    
    //새로고침 시 user_id, user_seq 사라지는거 방지
    useEffect(()=>{
        if(user!=null){
            setLoginId(user.userid);
            setLoginSeq(user.user_seq);
        }
    }, [user])
    
    const deleteItem = ()=>{
        var frmData = new FormData();
        frmData.append("user_seq", login_seq);
        frmData.append("free_seq", free_seq);

        axios.post(`http://localhost:9090/dangjang/like/delete/`, frmData)
            .then(
              res=>{
                console.log('Deleted');
                console.log(res.data);
                setPost(res.data.dto);
              }
            ).catch(err => console.log(err));
          alert("취소!")
        console.log("취소!");  
    }

    const insertItem=()=> {
        var frmData = new FormData();
        frmData.append("user_seq", login_seq);
        frmData.append("free_seq", free_seq);
        frmData.append("like", 0);
      
        axios.post('http://localhost:9090/dangjang/like/insert/', frmData)
        .then(
            res =>{
              console.log('insert like', res.data);
  
              if(res.data.result == "success"){
  
                alert("좋아요!");
                console.log(res.data);
                setPost(res.data.dto);

              }
            } 
        );
      }
    
    return (
        <>
        { post &&
            <div className="post">
            <div className="post__top">
                <Avatar src = {post.image} className="post__avatar"/>
                <div className="post__topInfo">
                    <h3>{userid}</h3>
                    <p>{wdate}</p>
                </div>
            </div>

            <div className="post__bottom">
                <p>{content}</p>
            </div>
            
            <div className="post__image">
                <img src={post.image} alt=""/>
            </div>

            <div className="post__options">
                             
                {
                    post.click == 0 ? 
                        <>
                            <div className="post__option" onClick={insertItem}>
                                <HeartOutlined/>
                            </div>
                        </>
                    : 
                        <>
                            <div className="post__option" onClick={deleteItem}>
                                <HeartFilled/>
                            </div>
                        </>
                } 
                    
                {like_cnt}



                <div className="post__option">
                    
                   <Link className="fbCommentBtn" to={`/freeboard/view/${free_seq}`}> <ChatBubbleOutlineOutlinedIcon/> </Link>
                </div>

                <div className="post__option">
                    <NearMeIcon/>
                    <p></p>
                </div>

                <div className="post__option">
                    <AccountCircleIcon />
                    <ExpandMoreOutlined />
                    
                </div>

            </div>

        </div>
        }

    </>
    )
    
    
}

export default ViewPost;
