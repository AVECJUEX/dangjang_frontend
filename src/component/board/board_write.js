import React, { useEffect, useState, Fragment, useMemo } from "react";
import { Link, useNavigate  } from "react-router-dom";
import Axios from "axios";
import FileUpload from "./util/FileUpload";
import styled from "styled-components";
import { useUserState } from "../member/UserContext";

const MainInfoBackground = styled.div`
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const MainInfoContainer = styled.div`
  width: 976px;
  margin: 0 auto;
  padding-bottom: 20px;
  background-color: white;
  border: 1px solid rgb(227, 227, 227);
  border-radius: 15px;

  @media ${(props) => props.theme.tablet} {
    width: 640px;
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }

  .content-box {
    width: 95%;
    padding-bottom: 15px;
    margin: 0 auto;
    border-bottom: 1px solid rgb(227, 227, 227);

    &:last-child {
      border-bottom: none;
    }
  }
`;

function BoardWrite( ){
    let history = useNavigate (); //자바스크립트 : history.go(-1)
    const { user } = useUserState();
    // let login_id = user.userid;
    // let login_seq = user.user_seq;
    // 위에 let 함수를 useState 안에 담아줌
    const [login_id, setLoginId] = useState("");
    const [login_seq, setLoginSeq] = useState("");
    
    // const [user_id, setUser_id] = useState(0);
    const [imageSrc, setImageSrc] = useState("");
    const [imageSrcList, setImageSrcList] = useState([]);
    const [fileList, setfileList] = useState([])
    const [inputs, setInputs] = useState({
      category_code:'',
      title: '',
      user_id: '',
      user_seq: '',
      content:'',
      price:''
    });

    //input에 저장된 값을 해체한다
    //title = inputs.title
    //writer = input.writer
    const { category_code, title, user_id ,user_seq , content, price } = inputs; 
    // const { category_code, title, content, price } = inputs; 
    //폼태그에서 값들이 바뀌면 호출될 함수
    const onChange = (e) => {
      //e-매개변수는 이벤트를 발생시킨 객체에 대한 정보가 저장된다. 이벤트도 기억하고 있고,
      //e.target.name,e.target.value
      //<input name="title" value=""> 현재 이 태그에 포커스가 있을 때 우리가 키를 누르면
      //e.target.name에는 title,value는 키보드 입력한 값
      //e.target.name,e.target.value    <input name="title" value="">
      const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
      console.log(value, name);//태그에 들어간 값을  state에 저장해야한다.
      setInputs({
        ...inputs, // 기존의 input 객체를 복사한 뒤
        [name]: value // name 키를 가진 값을 value 로 설정
      });
    };

    //새로고침 시 user_id, user_seq 사라지는거 방지
    useEffect(()=>{
      if(user!=null){
        setLoginId(user.userid);
        setLoginSeq(user.user_seq);
      }
    }, [user])
   

    //서버로 정보를 전송하는 함수
    const onSubmit=(e)=> {
      e.preventDefault(); //무조건 서버로 전송을 하도록 되어있어서 그 작업 못하게 막고
      //오류처리

      //파일 업로드 할땐느 반드시 formdate 객체를 만들어야 한다
      // Axios.post('http://localhost:9090/mongo/update/', obj)
      //      .then(res => console.log(res.data));
      var frmData = new FormData(e.currentTarget); //전체를 한번에 넣을 수 있게 해준다.
      fileList.map((file)=>frmData.append("fileList", file))
      
      Axios.post('http://localhost:9090/dangjang/board/insert2/', frmData)
      .then(
          res =>{
            console.log(res.data);
            alert("등록되었습니다.");
            history('/board');
          } 
      );
    }

    useEffect(()=>{
      console.log("[fileList----]",fileList);
      fileList.map((file, idx)=> {
        encodeFileToBase64(file)});
    }, [fileList]);
    
    const encodeFileToBase64 = (fileBlob) => {
      //if(fileBlob==="") return;
      // console.log(fileBlob);
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      return new Promise((resolve) => {
        reader.onload = () => {
          setImageSrc(reader.result);
          resolve();
        };
      });
    }
    
    useEffect(()=>{
      if(imageSrc!==""){ 
        setImageSrcList([...imageSrcList, imageSrc])
      }
    }, [imageSrc])

    // const Cancle{

    // }

    return (
      <MainInfoBackground>
      <MainInfoContainer>
      <div className="content-box">
        <form name="myform" onSubmit={onSubmit}  encType="multipart/form-data">
            <div>
              <div className="form-group" style={{width:"49%", float:"left"}} >
                  <label>id: </label>
                  <input type="text" 
                    className="form-control"
                    name="user_id"
                    value={login_id}
                    onChange={onChange}
                    readOnly
                    />
                </div>
                <div className="form-group" style={{width:"49%", float:"right"}} >
                  <label>user_seq: </label>
                  <input type="text" 
                    className="form-control"
                    name="user_seq"
                    value={login_seq}
                    onChange={onChange}
                    readOnly
                    />
              </div>
            </div>
            <div>
              <div className="form-group" style={{width:'49%', float:"left"}}>
                  <label>가격: </label>
                  <input type="text"
                    name="price" 
                    className="form-control"
                    value={price}
                    onChange={onChange}
                    />
              </div>
              <div className="form-group" style={{width:"49%", float:"right"}}>
                  <label>분류: </label>
                  <select name="category_code" style={{display:"block"}} >  
                    <option value=""onChange={onChange}>선택하세요</option>                  
                    <option value="01"onChange={onChange}>옷</option>
                    <option value="02"onChange={onChange}>가전/전자제품</option>
                    <option value="03"onChange={onChange}>생활용품</option>
                    <option value="04"onChange={onChange}>식품</option>
                    <option value="05"onChange={onChange}>뷰티/미용</option>
                    <option value="06"onChange={onChange}>차량</option>
                    <option value="07"onChange={onChange}>도서/음반</option>
                    <option value="08"onChange={onChange}>기타</option>
                  </select>
              </div>
            </div>
            <div>
              <div className="form-group" style={{clear:"both"}}>    
                  <label>제목: </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="title"
                    value={title}
                    onChange={onChange}
                    />
              </div>
            </div>
              <div className="form-group">
                  <label>내용: </label>
                  <input type="text"
                    name="content" 
                    className="form-control"
                    value={content}
                    onChange={onChange}
                    />
              </div>
              <label>파일: </label>
              <div className="form-group">
                  <FileUpload setfileList={setfileList}>
                  </FileUpload>
              
                  <div style={{display: 'flex', height: '240px', border: '1px solid lightgray', overflowX:'scroll'}}>
                    {fileList && 

                      (imageSrcList.map((image1, idx)=>{
                      
                      return <Fragment key={idx}><img style={{width:'250px', height: '100%'}} 
                      src={image1} alt="preview-img"/></Fragment>}))

                    }
                  </div>
              </div>
              <hr/>
              <div className="form-group" >
                  <input type="submit" value="등록 " className="btn btn-primary"/>
                  <input type="submit" value="취소 " className="btn btn-primary" style={{float:'right'}}/>
              </div>
          </form>
      </div>
      </MainInfoContainer>
      </MainInfoBackground>
    );
  }

export default BoardWrite;
