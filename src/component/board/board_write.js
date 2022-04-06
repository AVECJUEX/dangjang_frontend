
import React, { useEffect, useState, Fragment, useMemo } from "react";
import { Link, useNavigate  } from "react-router-dom";
import Axios from "axios";
import FileUpload from "./FileUpload"

function BoardWrite( ){

    let history = useNavigate (); //자바스크립트 : history.go(-1)
    //let user_id = "test1";
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


    return (
      <div>
        <form name="myform" onSubmit={onSubmit}  encType="multipart/form-data">
              <div className="form-group">    
                  <label>제목:  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="title"
                    value={title}
                    onChange={onChange}
                    />
              </div>
              <div className="form-group">
                  <label>id: </label>
                  <input type="text" 
                    className="form-control"
                    name="user_id"
                    value={user_id}
                    onChange={onChange}
                    />
              </div>
              <div className="form-group">
                  <label>user_seq: </label>
                  <input type="text" 
                    className="form-control"
                    name="user_seq"
                    value={user_seq}
                    onChange={onChange}
                    />
              </div>
              <div className="form-group">
                  <label>가격: </label>
                  <input type="text"
                    name="price" 
                    className="form-control"
                    value={price}
                    onChange={onChange}
                    />
              </div>
              <div className="form-group">
                  <label>분류: </label>
                  <input type="text"
                    name="category_code" 
                    className="form-control"
                    value={category_code}
                    onChange={onChange}
                    />
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
              
                  <div style={{display: 'flex', height: '240px', border: '1px solid lightgray'}}>
                    {fileList && 

                      (imageSrcList.map((image1, idx)=>{
                      
                      return <Fragment key={idx}><img style={{width:'100px', height: '50%'}} src={image1} alt="preview-img"/></Fragment>}))

                    }

                    {/* { fileList &&
                      fileList.map((file, idx) => {

                        encodeFileToBase64(file);
                        return <Fragment key={idx}><img style={{width:'100px', height: '50%'}} src={imageSrc} alt="preview-img"/></Fragment>
                        
                      })

                    } */}
                  </div>
              </div>
              <div className="form-group">
                  <input type="submit" value="등록 " className="btn btn-primary"/>
              </div>
          </form>

      </div>
    );
  }

export default BoardWrite;
