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
import { useUserState } from "../member/UserContext";

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
    //let { free_seq } = useParams();
    const { user } = useUserState();
    let history = useNavigate (); //자바스크립트 : history.go(-1)
    //let login_id = user.userid;
    //let login_seq = user.user_seq;
    const [like_cnt, setLikeCnt] = useState("");
    const [isShow, setIsShow] = useState(false);
    
    const [like, setLike] = useState("");
    const [changeClick, setChangeClick] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);

    const [login_id, setLoginId] = useState("");
    const [login_seq, setLoginSeq] = useState("");

    //새로고침 시 user_id, user_seq 사라지는거 방지
    useEffect(()=>{
        if(user!=null){
            setLoginId(user.userid);
            setLoginSeq(user.user_seq);
        }
    }, [user])
   
          
    
    useEffect(()=>{
        console.log("[Post----free_seq----]",free_seq);
        console.log("click1111--------->", click);
        setChangeClick(click);
    },[]);

    const onClick = () => {
        setIsShow(!isShow);
    };

    const deleteItem = ()=>{
        var frmData = new FormData();
        frmData.append("user_seq", login_seq);
        frmData.append("free_seq", free_seq);

        console.log('11111111111111', login_seq, free_seq);

        Axios.post(`http://localhost:9090/dangjang/like/delete/`, frmData)
            .then(
              res=>{
                console.log('Deleted');
                console.log(res.data);
                setLike(res.data.likedto);
                setIsSuccess(true);
                setLikeCnt(res.data.dto.like_cnt);
                setChange(!change);
                setChangeClick(res.data.dto.click);
              }
            ).catch(err => console.log(err));
          alert("취소!")
        console.log("취소!");  
    }

    const insertItem=()=> {
        var frmData = new FormData();
        frmData.append("user_seq", login_seq);
        frmData.append("free_seq", free_seq);
        frmData.append("like", user_seq);
      
        Axios.post('http://localhost:9090/dangjang/like/insert/', frmData)
        .then(
            res =>{
              console.log(res.data.result);
  
              if(res.data.result == "success"){
  
                alert("좋아요!");
                console.log(res.data);
                setLike(res.data.likedto);
                setIsSuccess(true);
                setLikeCnt(res.data.dto.like_cnt);
                setChange(!change);
                setChangeClick(res.data.dto.click);

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
                    changeClick == 0 ? 
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
