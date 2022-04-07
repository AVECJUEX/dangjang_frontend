
import React, { useState, useEffect} from "react";
import { Link, NavLink, useNavigate, useParams  } from "react-router-dom";
import Axios from "axios";

function QnaUpdate( props){
  let history = useNavigate (); //자바스크립트 : history.go(-1)
 
  let { qna_seq } = useParams();
    const [inputs, setInputs] = useState({
      title: '',
      user_seq: '',
      content:'',
      filename:''
    });

    //input에 저장된 값을 해체한다
    //title = inputs.title
    //user_seq = input.user_seq
    const { title, user_seq,content,filename } = inputs; 
  
    //폼태그에서 값들이 바뀌면 호출될 함수
    const onChange = (e) => {
      //e-매개변수는 이벤트를 발생시킨 객체에 대한 정보가 저장된다. 이벤트도 기억하고 있고,
      //e.target.name,e.target.value
      //<input name="title" value=""> 현재 이 태그에 포커스가 있을 때 우리가 키를 누르며ㅑㄴ
      //e.target.name에는 title,value는 키보드 입력한 값
      //e.target.name,e.target.value    <input name="title" value="">
      const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
      console.log(value, name);//태그에 들어간 값을  state에 저장해야한다.
      setInputs({
        ...inputs, // 기존의 input 객체를 복사한 뒤
        [name]: value // name 키를 가진 값을 value 로 설정
      });
    };
  
    

    useEffect(() => { 
       
       
      console.log( qna_seq );

      Axios.get(`http://localhost:9090/dangjang/qna/view/${qna_seq}`)
           .then(
             res => {
                 console.log("질문"+res.data.content);  //f12 눌러서 확인하기 
                 setInputs({
                   qna_seq:qna_seq,
                   title: res.data.title,
                   user_seq: res.data.user_seq,
                   content:res.data.content,
                   category_code : res.data.category_code,
                   image:res.data.image,
                   answer:res.data.answer,
                   at:res.data.at,
                   filename:res.data.image
                 });
             }
           );
  
    

     //console.log( heroState.hero );
   }, []);
   

    //서버로 정보를 전송하는 함수
    const onSubmit=(e)=> {
      e.preventDefault(); //무조건 서버로 전송을 하도록 되어있어서 그 작업 못하게 막고
      //오류처리

      //파일 업로드 할땐느 반드시 formdate 객체를 만들어야 한다
      // Axios.post('http://localhost:9090/mongo/update/', obj)
      //      .then(res => console.log(res.data));
      var frmData = new FormData(); 
      frmData.append("title", inputs.title);
      frmData.append("user_seq", inputs.user_seq);
      frmData.append("content", inputs.content);
      frmData.append("qna_seq", inputs.qna_seq);
      frmData.append("file", document.myform.filename.files[0]);
      
      Axios.post('http://localhost:9090/dangjang/qna/update/', frmData)
      .then(
          res =>{
            console.log(res.data);
            alert("등록되었습니다.");
            history('-1');
          } 
      );
    }
  
    return (
      <div style={{display : 'inline-block', width : '78%', marginLeft:'7%', padding : '0px', verticalAlign: 'top'}}>
    
       
          <h1>Q&A 질문 수정</h1>
          <br/>
          <h2 className="qnalist-title">Q. {inputs.title}</h2>

          <div className="qnalist-contents">
            {inputs.content}


          </div>
          {console.log("카테고리코드 : " + inputs.category_code)}
          {console.log("사용자 등급 : " + inputs.at)}
          
          
          <br></br>
          <form name="myform" onSubmit={onSubmit}  encType="multipart/form-data">
            <input type="hidden" name="qna_seq" value={inputs.qna_seq}></input>
          <div className="form-group">    
                  <label>제목:  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="title"
                    value={inputs.title}
                    onChange={onChange}
                    />
              </div>
              <div className="form-group">
                  <label>이름: </label>
                  <input type="text" 
                    className="form-control"
                    name="user_seq"
                    value={inputs.user_seq}
                    onChange={onChange}
                    />
              </div>
              <div className="form-group">
                  <label>내용: </label>
                  <input type="text"
                    name="content" 
                    className="form-control"
                    value={inputs.content}
                    onChange={onChange}
                    />
              </div>
              <div className="form-group">
                  <label>파일: </label>
                  <input type="file"
                    name="filename" 
                    className="form-control"
                   
                    onChange={onChange}
                    />
                      <img src={inputs.image} alt=""/>
              </div>
              <div className="form-group">
                  <input type="submit" value="수정 " className="btn btn-primary"/>
              </div>
       
</form>
       
      </div>
    );
  }

export default QnaUpdate;