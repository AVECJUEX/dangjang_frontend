import React, { useEffect, useState, Fragment, useMemo } from "react";
import { Link, useNavigate  } from "react-router-dom";
import Axios from "axios";
import { HeartOutlined } from '@ant-design/icons';
import { HeartFilled } from '@ant-design/icons';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

function Like_insert({free_seq, setLikeCnt, click} ){

    let history = useNavigate (); 
    let login_id = window.sessionStorage.getItem("userid");
    let login_seq = "1";

    const [like, setLike] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const refreshPage=()=>{ 
      return window.location.href = `/freeboard/view/${free_seq}`
    }

    useEffect(()=>{console.log("like-------------------", like)},[like])

    //서버로 정보를 전송하는 함수
    const onSubmit=()=> {
      var frmData = new FormData();
      frmData.append("user_seq", login_seq);
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
            }
          } 
      );
    }
    
/*
    useEffect(()=>{
      console.log("제일 처음isSuccess-----------------------", isSuccess)
      var frmData2 = new FormData();
      frmData2.append("user_seq", login_seq);
      frmData2.append("free_seq", free_seq);

      Axios.post('http://localhost:9090/dangjang/like/view/', frmData2)
      .then(
          res =>{
            console.log(res.data.likedto);
            console.log(res.data.result);
            setLike(res.data.likedto);
            setLikeCnt(res.data.like_cnt);
          } 
      );
    }, [])

    const deleteItem = ()=>{
       
        var frmData = new FormData();
        frmData.append("user_seq", login_seq);
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

              }
            ).catch(err => console.log(err));
          alert("취소!")
        console.log("취소!");  
    }
    */
    return (<>
        {
          click == 0 ? 
            // <ThumbUpIcon onClick={onSubmit}/>
            <HeartOutlined/>
          : 
            // <ThumbUpIcon onClick={deleteItem}/>
            <HeartFilled/>
        }
      </>)
  }

export default Like_insert;
