import React, { useEffect, useState, Fragment, useMemo } from "react";
import { Link, useNavigate  } from "react-router-dom";
import Axios from "axios";
import { HeartOutlined } from '@ant-design/icons';
import { HeartFilled } from '@ant-design/icons';

function Zzim_insert( ){

    let history = useNavigate (); 
    let login_id = "test1";
    let login_seq = "1";

    const [inputs, setInputs] = useState({
      user_seq: '',
      board_seq:'',
      zzim:''
    });

    const { user_seq, zzim, board_seq } = inputs; 

    const onChange = (e) => {
      const { value, name } = e.target; 
      console.log(value, name);
      setInputs({
        ...inputs, 
        [name]: value 
      });
    };

    const refreshPage=()=>{ 
      return window.location.href = '/board/view'
    }

    //서버로 정보를 전송하는 함수
    const onSubmit=(e)=> {
      e.preventDefault(); 
      var frmData = new FormData(e.currentTarget);
    
      Axios.post('http://localhost:9090/dangjang/zzim/insert/', frmData)
      .then(
          res =>{
            console.log(res.data);
            alert("좋아요!");
            refreshPage();
          } 
      );
    }

    const deleteItem = (e)=>{
      e.preventDefault(); 
      var frmData = new FormData(e.currentTarget);
        Axios.get(`http://localhost:9090/dangjang/zzim/delete/`, frmData)
            .then(
              ()=>{
                console.log('Deleted');
              }
            ).catch(err => console.log(err));
          alert("취소!")
        refreshPage();
        console.log("취소!");  
    }
    
    return (
      {
        zzim = ''? (
        <form name="myform" onSubmit={onSubmit}  encType="multipart/form-data">
                <HeartOutlined>
                    <input type="hidden" 
                      className="form-control"
                      name="user_id"
                      value={login_id}
                      onChange={onChange}
                      readOnly
                    />
                    <input type="hidden" 
                      className="form-control"
                      name="board_seq"
                      value={board_seq}
                      onChange={onChange}
                      readOnly
                    />
                    <input type="hidden" 
                      className="form-control"
                      name="zzim"
                      value='1'
                      onChange={onChange}
                      readOnly
                    />
                </HeartOutlined>
        </form>)
        : (
        <form name="myform" onSubmit={deleteItem}  encType="multipart/form-data">
                <HeartFilled>
                  <input type="hidden" 
                    className="form-control"
                    name="user_id"
                    value={login_id}
                    onChange={onChange}
                    readOnly
                  />
                  <input type="hidden" 
                    className="form-control"
                    name="board_seq"
                    value={board_seq}
                    onChange={onChange}
                    readOnly
                  />
                  <input type="hidden" 
                    className="form-control"
                    name="zzim"
                    value='0'
                    onChange={onChange}
                    readOnly
                  />
                </HeartFilled>
        </form>)
      }
    );
  }

export default Zzim_insert;
