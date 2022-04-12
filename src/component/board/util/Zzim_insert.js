import React, { useEffect, useState, Fragment, useMemo } from "react";
import { Link, useNavigate  } from "react-router-dom";
import Axios from "axios";
import { HeartOutlined } from '@ant-design/icons';
import { HeartFilled } from '@ant-design/icons';

function Zzim_insert({board_seq, setZzimCnt} ){

    let history = useNavigate (); 
    let login_id = "test1";
    let login_seq = "1";

    const [zzim, setZZim] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const refreshPage=()=>{ 
      return window.location.href = `/board/view/${board_seq}`
    }

    useEffect(()=>{console.log("zzim-------------------", zzim)},[zzim])

    //서버로 정보를 전송하는 함수
    const onSubmit=()=> {
      var frmData = new FormData();
      frmData.append("user_seq", login_seq);
      frmData.append("board_seq", board_seq);
      frmData.append("zzim",'1');
    
      Axios.post('http://localhost:9090/dangjang/zzim/insert/', frmData)
      .then(
          res =>{
            console.log(res.data.result);

            if(res.data.result == "success"){

              alert("좋아요!");
              console.log(res.data.zzimdto);
              console.log(res.data.result);
              setZZim(res.data.zzimdto);
              setIsSuccess(true);
              setZzimCnt(res.data.zzim_cnt);
            }
          } 
      );
    }

    useEffect(()=>{
      console.log("제일 처음isSuccess-----------------------", isSuccess)
      var frmData2 = new FormData();
      frmData2.append("user_seq", login_seq);
      frmData2.append("board_seq", board_seq);

      Axios.post('http://localhost:9090/dangjang/zzim/view/', frmData2)
      .then(
          res =>{
            console.log(res.data.zzimdto);
            console.log(res.data.result);
            setZZim(res.data.zzimdto);
            setZzimCnt(res.data.zzim_cnt);
          } 
      );
    }, [])

    const deleteItem = ()=>{
        var frmData = new FormData();
        frmData.append("user_seq", login_seq);
        frmData.append("board_seq", board_seq);

        Axios.post(`http://localhost:9090/dangjang/zzim/delete/`, frmData)
            .then(
              res=>{
                console.log('Deleted');
                console.log(res.data.zzimdto);
                console.log(res.data.result);
                setZZim(res.data.zzimdto);
                setIsSuccess(true);
                setZzimCnt(res.data.zzim_cnt);

              }
            ).catch(err => console.log(err));
          alert("취소!")
        console.log("취소!");  
    }
    
    return (<>
        {
          zzim == undefined ? 
            <HeartOutlined onClick={onSubmit}/>
          : 
            <HeartFilled onClick={deleteItem}/>
        }
      </>)
  }

export default Zzim_insert;
