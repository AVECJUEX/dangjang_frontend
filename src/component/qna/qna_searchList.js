
import TableRow from './TableRow'
import React, { useState, useEffect} from "react";
import {  Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import Axios from "axios";
import "../../page.css";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import { useUserState } from '../member/UserContext';



function QnaSearchList() {
  const { user } = useUserState();
  const [login_id, setLoginId] = useState("");
  const [login_seq, setLoginSeq] = useState("");
  const [login_role,setLoginRole] = useState("");

  useEffect(()=>{
    if(user!=null){
      setLoginId(user.userid);
      setLoginSeq(user.user_seq);
      setLoginRole(user.role);
    }
  }, [user])

  let {keyword} = useParams();
  console.log("키워드 파라미터 : " + keyword);
  const [result, setResult] = useState([]) //게시글

  const [page, setPage] = useState(1);  
  
   

 
  useEffect(() => { 

    console.log( keyword );

    Axios.get('http://localhost:9090/dangjang/qna/search/'+page+'/'+keyword)
         .then(
           res => {
               setResult(res.data.list);
           }
         );
         //console.log( heroState.hero );
 }, [keyword]);

       
 
  
 
   
  
  return(
    
    <div style={{display : 'inline-block', width : '78%', marginLeft:'7%', padding : '0px', verticalAlign: 'top'}}>
       {
          result.map(function(object, i){
          return<TableRow obj={object} key={i} login_seq={login_seq} login_role={login_role}/>
          })
          
        } 
       
  </div>
  );
}

export default QnaSearchList;