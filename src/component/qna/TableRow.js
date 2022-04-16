import React, { Component,useEffect,useState } from 'react';
import { Link, useNavigate  } from "react-router-dom";
import Axios from 'axios';
import { useUserState } from "../member/UserContext";

function TableRow(props){
  let history = useNavigate ();
  const [login_seq,setLoginSeq] = useState(props.login_seq);
  const [login_role, setLoginRole] = useState(props.login_role);
  const refreshPage=()=>{ 
    window.location.reload(); 
  }
useEffect(()=>{
  console.log("테이블로우 회원등급: "+login_role);
  console.log("테이블로우 회원번호: "+login_seq);
},[]);
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
  const secretItem=(e) =>{
    alert('작성자만 열람 가능합니다.');
    
  }
  
  //세션에 저장된 아이디 값 세션에 저장된 사용자 등급에 따라 보이는 것을 바꿈
  //가상 세션값  1:관리자 2:사용자
  const sessionId = '1';
  const sessionAt = '2';
 
  return (

        //1.at값이 1일때 모든 제목 표시
        //2.at 값이 2일 때 게시글 작성자 번호와 로그인 세션 사용자 번호를 비교
        //3.작성자 번호와 로그인 사용자 번호가 같을 시 제목 표시 후 뷰로 넘어 갈 수 있음
        //4.작성자 번호와 로그인 사용자 번호가 달라도 작성자 번호가 3번이면 모두 조회 가능 
        login_role === 'ADMIN' ? 
        (<Link to={"/qna/qna/view/"+props.obj.qna_seq} className="qnalist" >Q. {props.obj.title}</Link>):
        (props.obj.user_seq===login_seq ? <Link to={"/qna/qna/view/"+props.obj.qna_seq} className="qnalist" >Q. {props.obj.title}</Link> :
        
        (<Link to='/qna/qna/qna/qnafree' onClick={secretItem} className="qnalist">Q. 비밀글</Link>)
        )
        
         
       
      
    );
    
  }
  

export default TableRow;