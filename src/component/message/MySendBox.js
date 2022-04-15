import React, { useEffect, useState } from 'react';
import axios from "axios";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useUserState } from "../member/UserContext";

function MySendBox(props) {

    const { user } = useUserState();
    const [sendBox, setSendBox] = useState([]);
    

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
        //
        if(user!=null){

        axios.get(`http://localhost:9090/dangjang/box/sender/?sender=${user.userid}`).then((res)=>{
            console.log(res.data);
            console.log(res.data.sendList);
      
            if(res.data.sendList.length!==0){
              setSendBox(res.data.sendList);
              
            } 
        })

      }

    }, [user]);


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



    return (
      <div>
      <h3 align="center">보낸 쪽지함</h3>
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
            <th>받은 사람</th> 
            <th></th>
          </tr>
        </thead>
        <tbody>
      
                {sendBox.map((data, idx)=>{
                  return (
                      <tr>
                      <td><p key={idx}><img src={data.image} alt="111"/></p></td>
                      <td></td>
                      <td><p key={idx}>{data.content}</p></td>
                      <td></td>
                      <td><p key={idx}>{data.sender}</p></td>
                      <td><p key={idx}>{data.ischeck}</p></td>
                      <td><DeleteOutlineIcon onClick={()=>deleteBtn(data.box_seq)}/></td>
                      <td></td>
                      </tr>
                   )

                })}                                         
        </tbody>
      </table>

      </div>
    );
}

export default MySendBox;