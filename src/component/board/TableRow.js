import React, { Component } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios';


function TableRow(props){
  let history = useNavigate ();

  const refreshPage=()=>{ 
    window.location.reload(); 
  }

  const deleteItem = (e)=>{
      if(window.confirm("삭제하시겠습니까?"))
      {
        Axios.get('http://localhost:9090/dangjang/board/delete/'+props.obj.id)
            .then(
              ()=>{
                console.log('Deleted');
                history('/board');
              }
            ).catch(err => console.log(err));
        refreshPage();
        console.log("delete");  
      }
  }
  
    return (
      <div className="list" key={props.obj.board_seq}>
        <li>
          <Link to={`/board/view/${props.obj.board_seq}`}>
            <div className="Board">
              <img src={props.obj.image1} alt={props.obj.image1}></img>
              
            </div>
            <div className="BoardInfo">
              <p className="BoardInfo__title">{props.obj.title}</p>
              <p className="BoardInfo__category">{props.obj.category_name}</p>
              <p className="BoardInfo__price">{props.obj.price}원</p>
            </div>
          </Link>
        </li>
      </div>      
    );
  }
  
/*

*/
export default TableRow;