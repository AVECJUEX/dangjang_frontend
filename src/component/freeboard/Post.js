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
import Like_insert from './util/Like_insert';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

/**
 free_seq={free_seq}
                title= {title}
                content={content}
                user_id={user_id}
                user_seq={user_seq}
                hit={hit}
                wdate={wdate}
 */

function Post({free_seq, userid, title, content, image, wdate, hit, user_seq, click, change, setChange}) {
    let history = useNavigate ();
    //let { free_seq } = useParams();

    const [like_cnt, setLikeCnt] = useState("");
    const [isShow, setIsShow] = useState(false);
    
    const [like, setLike] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const onClick = () => {
        setIsShow(!isShow);
      };

    useEffect(()=>{
      console.log("[Post----free_seq----]",free_seq);
    },[]);

    const deleteItem = ()=>{
       
        var frmData = new FormData();
        frmData.append("user_seq", "1");
        frmData.append("free_seq", free_seq);

        Axios.post(`http://localhost:9090/dangjang/like/delete/`, frmData)
            .then(
              res=>{
                console.log('Deleted');
                console.log(res.data.likedto);
                console.log(res.data.result);
                setLike(res.data.likedto);
                setIsSuccess(true);
                setLikeCnt(res.data.like_cnt);
                setChange(!change);

              }
            ).catch(err => console.log(err));
          alert("취소!")
        console.log("취소!");  
    }

    const insertItem=()=> {
        var frmData = new FormData();
        frmData.append("user_seq", "1");
        frmData.append("free_seq", free_seq);
        frmData.append("like",'1');
      
        Axios.post('http://localhost:9090/dangjang/like/insert/', frmData)
        .then(
            res =>{
              console.log(res.data.result);
  
              if(res.data.result == "success"){
  
                alert("좋아요!");
                console.log(res.data.likedto);
                console.log(res.data.result);
                setLike(res.data.likedto);
                setIsSuccess(true);
                setLikeCnt(res.data.like_cnt);
                setChange(!change);
              }
            } 
        );
      }
    
    return (
        <div className="post">
            <div className="post__top">
                <Avatar src = {image} className="post__avatar"/>
                <div className="post__topInfo">
                    <h3>{userid}</h3>
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
              
                    
                {/*<Like_insert free_seq={free_seq} setLikeCnt={setLikeCnt} click={click}/>*/}
                
                {
                    click == 0 ? 
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
    )
}

export default Post
