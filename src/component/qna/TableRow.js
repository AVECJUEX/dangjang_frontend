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
  
 
    return (
      <Link to="/" className="qnalist" >Q. {props.obj.title}</Link>
       
    );
  }
  

export default TableRow;