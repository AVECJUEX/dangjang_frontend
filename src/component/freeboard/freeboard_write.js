import {Avatar} from '@material-ui/core';
import React, { useState, useEffect, Fragment} from "react";
import { Routes, Route, Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import FreeBoardView from './freeboard_view'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NearMeIcon from '@material-ui/icons/NearMe';
import Axios from "axios";
import "../../page.css";
import Pagination from "react-js-pagination";
import Feed from './Feed'
import Post from './Post';
import { ExpandMoreOutlined } from "@material-ui/icons";
import styled from "styled-components";
import FileUpload from "../board/FileUpload";

const BoardBox = styled.div`
  .Category {
    white-space: nowrap;
    max-width: 1320px;
    padding: 12px 0 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 60px;
    line-height: 30px;
  }

  .Category p {
    color: #292a32;
    font-size: 22px;
    font-weight: 900;
    letter-spacing: -0.4px;
    line-height: 30px;
  }
  .btn {
    color: #fff;
    background-color: #6667ab;
    border-color: #6667ab;
  }
`;


function FreeBoardWrite( ){

    let history = useNavigate (); //자바스크립트 : history.go(-1)

    const [imageSrc, setImageSrc] = useState("");
    const [imageSrcList, setImageSrcList] = useState([]);
    const [fileList, setfileList] = useState([]);
    const [inputs, setInputs] = useState({
      title: '',
      user_id: '',
      user_seq:'',
      wdate:'',
      content:'',
      image:''

    });

    //input에 저장된 값을 해체한다
    //title = inputs.title
    //writer = input.writer
    const { title, user_id, user_seq, wdate, content, image  } = inputs; 
  
    //폼태그에서 값들이 바뀌면 호출될 함수
    const onChange = (e) => {
      //e-매개변수는 이벤트를 발생시킨 객체에 대한 정보가 저장된다. 이벤트도 기억하고 있고,
      //e.target.name,e.target.value
      //<input name="title" value=""> 현재 이 태그에 포커스가 있을 때 우리가 키를 누르며ㅑㄴ
      //e.target.name에는 title,value는 키보드 입력한 값
      //e.target.name,e.target.value    <input name="title" value="">
      const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
      console.log(value, name);//태그에 들어간 값을  state에 저장해야한다.
      setInputs({
        ...inputs, // 기존의 input 객체를 복사한 뒤
        [name]: value // name 키를 가진 값을 value 로 설정
      });
    };
  
    // const onReset = () => {
    //   setInputs({
    //     title: '',
    //     user_id: '',
    //     content:'',
    //     filename:''
    //   })
    // };

    //서버로 정보를 전송하는 함수
    const onSubmit=(e)=> {
      e.preventDefault(); //무조건 서버로 전송을 하도록 되어있어서 그 작업 못하게 막고
      //오류처리

      //파일 업로드 할땐느 반드시 formdate 객체를 만들어야 한다
      // Axios.post('http://localhost:9090/mongo/update/', obj)
      //      .then(res => console.log(res.data));
      var frmData = new FormData(); 
      // frmData.append("title", inputs.title);
      // frmData.append("user_id", inputs.user_id);
      // frmData.append("content", inputs.content);
      
      frmData.append("file", document.myform.filename.files[0]);
      Axios.post('http://localhost:9090/freeboard/insert/', frmData)
      .then(
          res =>{
            console.log(res.data);
            alert("등록되었습니다.");
            history('/freeboard');
          } 
      );
    }

    useEffect(()=>{
      console.log("[fileList----]",fileList);
      fileList.map((file, idx)=> {
        encodeFileToBase64(file)});
    }, [fileList]);
    
    const encodeFileToBase64 = (fileBlob) => {
      //if(fileBlob==="") return;
      // console.log(fileBlob);
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      return new Promise((resolve) => {
        reader.onload = () => {
          setImageSrc(reader.result); 
          resolve();
        };
      });
    }

    useEffect(()=>{
      if(imageSrc!==""){ 
        setImageSrcList([...imageSrcList, imageSrc])
      }
    }, [imageSrc])


    return (
      <div className="post">
      <div className="post__top">
          <Avatar src = {image} className="post__avatar"/>
          <div className="post__topInfo">
              <h3>{user_id}</h3>
              <p>{wdate}</p>
              <div className="form-group">    
                  <label>제목: </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="title"
                    value={title}
                    onChange={onChange}
                    />
              </div>
          </div>
      </div>

      <div className="post__bottom">
          <p> 
            <div className="form-group">
                  <label>내용: </label>
                  <input type="text"
                    name="content" 
                    className="form-control"
                    value={content}
                    onChange={onChange}
                    />
              </div>
              <div className="form-group">
                  <FileUpload setfileList={setfileList}>
                  </FileUpload>
              
                  <div style={{display: 'flex', height: '240px', border: '1px solid lightgray', overflowX:'scroll'}}>
                    {fileList && 

                      (imageSrcList.map((image1, idx)=>{
                      
                      return <Fragment key={idx}><img style={{width:'250px', height: '100%'}} 
                      src={image} alt="preview-img"/></Fragment>}))

                    }
                  </div>
              </div>  
          </p>
      </div>
      
      <div className="post__image">
          <img src={image} alt=""/>
      </div>

      
      <BoardBox> 
      <Link className="btn" style={{float:'right'}} to="/freeboard/">취소</Link>
      </BoardBox>
      
  </div>
    );
  }

export default FreeBoardWrite;
