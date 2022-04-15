
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./MessageModal.css";
import axios from "axios";
import { useUserState } from "../member/UserContext";



const ReplyModal = (props) => {
  const { open, close, header, board_seq, receiver } = props;
  const history = useNavigate();
  const { user } = useUserState();
  const [content, setContent] = useState("");

  useEffect(()=>{

  },[])


  const sendBtn = (e) =>{
    e.preventDefault();
    console.log(e);

    if(content.trim().length===0 ){
      alert("내용을 입력하세요");
      return;
    } 
    var frmData = new FormData(e.currentTarget); //전체를 한번에 넣을 수 있게 해준다.


    frmData.append("board_seq", board_seq);
    frmData.append("sender", user.userid);
    
    axios.post('http://localhost:9090/dangjang/box/insert/', frmData)
    .then(
        res =>{
          console.log(res.data);
          alert("전송되었습니다.");
          history('/mysendbox');
          
        } 
    );

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
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main style={{ paddingBottom: -16 }}>
            <p>{props.children}</p>
            <form onSubmit={sendBtn}  encType="multipart/form-data">
           <div><p className="receiver"> 받는 사람</p> <input name="receiver" value={receiver}></input></div>
            <br/>
            <textarea onChange={onChangeContent} className="content" name="content"></textarea>
            <input className="send" type="submit" value="send"/>
            </form>

          </main>
        </section>
      ) : null}
    </div>
  );
};

export default ReplyModal;
