
import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import Axios from "axios";

function BoardWrite( ){

    let history = useNavigate (); //자바스크립트 : history.go(-1)

    const [inputs, setInputs] = useState({
      category_code:'',
      title: '',
      user_id: '',
      user_seq: '',
      content:'',
      price:'',
      image1:'',
      image2:'',
      image3:'',
      image4:'',
      image5:'',
      image6:'',
      fileList:''
    });

    //input에 저장된 값을 해체한다
    //title = inputs.title
    //writer = input.writer
    const { category_code, title, user_id ,user_seq , content, price, image1, image2, image3, image4, image5, image6, fileList  } = inputs; 
  
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
  
    const onReset = () => {
      setInputs({
        category_code: '',
        title: '',
        user_id: '',
        user_seq:'',
        content:'',
        price:'',
        image1:'',
        image2:'',
        image3:'',
        image4:'',
        image5:'',
        image6:''
      })
    };

    //서버로 정보를 전송하는 함수
    const onSubmit=(e)=> {
      e.preventDefault(); //무조건 서버로 전송을 하도록 되어있어서 그 작업 못하게 막고
      //오류처리

      //파일 업로드 할땐느 반드시 formdate 객체를 만들어야 한다
      // Axios.post('http://localhost:9090/mongo/update/', obj)
      //      .then(res => console.log(res.data));
      var frmData = new FormData(e.currentTarget); //전체를 한번에 넣을 수 있게 해준다.
      Axios.post('http://localhost:9090/dangjang/board/insert2/', frmData)
      .then(
          res =>{
            console.log(res.data);
            alert("등록되었습니다.");
            history('/board');
          } 
      );
    }
  
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
              <div className="form-group">
                  <label>파일: </label>
                  <input type="file"
                    name="fileList" 
                    className="form-control"
                    value={fileList}
                    onChange={onChange}
                    />
              </div>
              <div className="form-group">
                  <input type="submit" value="등록 " className="btn btn-primary"/>
              </div>
          </form>

      </div>
    );
  }

export default BoardWrite;
