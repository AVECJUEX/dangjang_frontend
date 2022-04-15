import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import axios from "axios";
import "./MessageModal.css";
import ReplyModal from './ReplyModal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useUserState } from "../member/UserContext";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';





function MyBox(props) {
  const { user } = useUserState();
    const [receiveBox, setReceiveBox] = useState([]);
    const [ischange, setIschange] = useState(false);
    const [clickBoardseq, setBoardSeq] = useState(0);
    const [clickSender, setSender] = useState("");

    let history = useNavigate (); //자바스크립트 : history.go(-1)

    const [login_id, setLoginId] = useState("");
    const [login_seq, setLoginSeq] = useState("");
    
  
    useEffect(()=>{
      console.log('login_id--------', login_id);
      if(user!=null){
        setLoginId(user.userid);
        setLoginSeq(user.user_seq);
        update(user.userid);
      }
    }, [user]);
  
  
    const getlist = (login_id) =>{
      if(user!=null){
          axios.get(`http://localhost:9090/dangjang/box/receiver/?receiver=${login_id}`).then((res)=>{
            console.log(res.data);
            console.log(res.data.receiveList);
      
            if(res.data.receiveList.length!==0){
              setReceiveBox(res.data.receiveList);
              
            } 
          
          })
      }

    }
    const deleteBtn = (box_seq) =>{
      
      //e.preventDefault();
      //console.log(e);
      var frmData = new FormData(); //전체를 한번에 넣을 수 있게 해준다
      
      frmData.append("box_seq",box_seq);

      axios.post('http://localhost:9090/dangjang/box/delete', frmData)
      .then(
          res =>{
            console.log(res.data);
            alert("삭제되었습니다.");
            window.location.reload(true);
            //setIschange(!ischange);
            //history("/mybox");
          } 
      );
    }

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = (board_seq, sender) => {
      console.log('11111111111111111',board_seq);
      setBoardSeq(board_seq);
      setSender(sender);
      setModalOpen(true); 
    };
    const closeModal = () => {
    
      setModalOpen(false);

    };

   
    const update = (login_id) =>{
      var frmData = new FormData(); //전체를 한번에 넣을 수 있게 해준다
      
      console.log('update-------------',login_id);
      frmData.append("receiver",login_id);

      axios.post('http://localhost:9090/dangjang/box/update', frmData)
      .then(
          res =>{
            console.log('dhqepd',res.data);
            getlist(login_id);
          } 
      );
    }

    


    return (
        <div>
        <h3 align="center">받은 쪽지함</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <colgroup>
            <col width="12%"/>
            <col width="5%"/>
            <col width="*"/>
            <col width="10%"/>
            <col width="12%"/>
            <col width="12%"/>
            
          </colgroup>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>메세지</th>
              <th></th>
              <th>발신자</th> 
              <th></th>
            </tr>
          </thead>
          <tbody>
            
               

                  {receiveBox.map((data, idx)=>{
                    return (
                        <tr>
                        <td><p key={idx}><img src={data.image} alt="111"/></p></td>
                        <td></td>
                        <td><p key={idx}>{data.content}</p></td>
                        <td></td>
                        <td><p key={idx}>{data.sender}</p></td>
                        <td><p key={idx}>{data.ischeck}</p></td>
                        <td><DeleteOutlineIcon onClick={()=>deleteBtn(data.box_seq)}/></td>
                        <td><LocalPostOfficeIcon onClick={()=>openModal(data.board_seq, data.sender)}/></td>
                        </tr>
                     )

                  })}

                 { modalOpen && 
                   <div><ReplyModal open={modalOpen} close={closeModal} header={"쪽지보내기"} board_seq={clickBoardseq} receiver={clickSender}/></div>
                 }
               
                  
                                                                         
          </tbody>
        </table>
            {/* <div>받은 쪽지함</div>
            {receiveBox.map((data, idx)=><p key={idx}>{data.content}</p>)}
            <div>보낸 쪽지함</div>      
            {sendBox.map((data, idx)=><p key={idx}>{data.content}</p>)} */}
        </div>
  
    );
}

export default MyBox;