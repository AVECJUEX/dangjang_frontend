import React, { useEffect, useState } from "react";
import { useUserDispatch, useUserState } from "../member/UserContext";

import { useNavigate } from "react-router";
import "./MessageModal.css";
import axios from "axios";
import { style } from "@mui/system";



const MessageModal = ({open, setModalOpen1, header, receiver, board_seq}) => {
  //const { open, close, header } = props;
  const history = useNavigate();
  //const {user} = use
  const { user } = useUserState();

  const [tmp, setTmp] = useState(true);
  const [content, setContent] = useState("");

  const sendBtn = (e) =>{
    e.preventDefault();
    console.log(e.currentTarget);

    if(content.trim().length===0 ){
      alert("내용을 입력하세요");
      return;
    } 
    var frmData = new FormData(e.currentTarget); //전체를 한번에 넣을 수 있게 해준다.

    

    frmData.append("board_seq", board_seq);
    frmData.append("sender", user.userid);
    //frmData.append("receiver","test1");
    
    axios.post('http://localhost:9090/dangjang/box/insert/', frmData)
    .then(
        res =>{
          console.log(res.data);
          alert("전송되었습니다.");
          history('/board');
        } 
    );
  }
  
  useEffect(()=>{
    console.log('tmp', tmp);
    console.log('modalopen', open)
    setModalOpen1(tmp);
  }, [tmp, open]);

  const close1 = ()=>{
    console.log(open);
    setTmp(!tmp);
  }

  const onChangeContent = (e) => {
    setContent(e.target.value);
  }

  useEffect(()=>{
    console.log(content)
  }, [content])

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header style={{zIndex:"10000px", textAlign:"left"}}>
            {header}
            <button className="close" onClick={close1}>
              &times;
            </button>
          </header>
          <main style={{ paddingBottom: -16 }}>
            <form onSubmit={sendBtn}  encType="multipart/form-data">
           <div style={{float:"left", textAlign:"left"}}><p className="receiver"> 받는 사람</p> <input name="receiver" value={receiver} ></input></div>
            <br/><br/><br/><br/>
            <textarea onChange={onChangeContent} className="content" name="content"></textarea>
            <input className="send" type="submit" value="send"/>
            </form>

          </main>
        </section>
      ) : null}
    </div>
  );
};

export default MessageModal;
