import React, { Component } from 'react';
import { Link, useNavigate  } from "react-router-dom";
import Axios from 'axios';

function TableRow(props){
  let history = useNavigate ();

  const refreshPage=()=>{ 
    window.location.reload(); 
  }

  const deleteItem = (e)=>{
      if(window.confirm("삭제하시겠습니까?"))
      {
        Axios.get('http://localhost:9090/dangjang/qna/delete/'+props.obj.qna_seq)
            .then(
              ()=>{
                console.log('Deleted');
                history('/qna');
              }
            ).catch(err => console.log(err));
        refreshPage();
        console.log("delete");  
      }
  }
  const loginCk =1;
    return (
        <tr>
          <td>
            {props.obj.qna_seq}
          </td>
            {loginCk === 2 ?  
            <td><Link to={"/qna/view/"+props.obj.qna_seq} style={{textDecoration :'none'}}>{props.obj.title}</Link></td> : 
            <td>비밀글</td> }
         
          <td>

            {props.obj.nick_name}
          </td>
          <td>
          <Link to={"/qna/view/"+props.obj.qna_seq} className="btn btn-primary" style={{ backgroundColor: '#6667AB', borderColor : '#6667AB' }}>수정</Link>
          </td>
          <td >
            <button  onClick={deleteItem} className="btn btn-danger" style={{ backgroundColor: '#ed5a5a', borderColor : '#ed5a5a' }}>삭제</button>
          </td>
        </tr>
    );
  }
  

export default TableRow;