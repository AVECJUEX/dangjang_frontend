import React, { useState,useEffect } from 'react';
import axios from "axios";
import { useUserState } from "../member/UserContext";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
  function Notification(){

    const { user } = useUserState();
    const [cnt, setCnt] = useState([]);
    
    const [login_id, setLoginId] = useState("");
    const [login_seq, setLoginSeq] = useState("");
    
  
    useEffect(()=>{
      console.log('login_id--------', login_id);
      if(user!=null){
        setLoginId(user.userid);
        setLoginSeq(user.user_seq);
      }
    }, [user]);
    
    useEffect(()=>{
      var frmData = new FormData();
      frmData.append("receiver",login_id);

    axios.post('http://localhost:9090/dangjang/box/count/', frmData)
    .then(

        res =>{
          console.log(res.data);
          setCnt(res.data);
          
        } 
        );
        
      },[])
    const notify = (cnt) => toast(`읽지 않은 메세지 ${cnt}건이 있습니다.`);


    return (
      <div>
        <button onClick={()=>notify(cnt)}>Notify!</button>
        <ToastContainer />
      </div>
    );
  }
  //{receiveBox.map((data, idx)=><p key={idx}>{data.content}</p>)}


export default Notification;