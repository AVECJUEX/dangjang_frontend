
import React, { useState, useEffect} from "react";
import { Link, NavLink, useNavigate, useParams  } from "react-router-dom";
import Axios from "axios";
import styled from "styled-components";

function QnaCommentWrite( props){

    let history = useNavigate (); //자바스크립트 : history.go(-1)
    
    let { qna_seq } = useParams();

    const [inputs, setInputs] = useState({
      title: '',
      user_seq: '',
      content:'',
      filename:'',
      c_content:'',
      qnaco_seq:''
    });

    

    //input에 저장된 값을 해체한다
    //title = inputs.title
    //user_seq = input.user_seq
    const { title, user_seq, content,qnaco_seq  } = inputs; 
  
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
  
    const onReset = () => {
      setInputs({
        title: '',
        user_seq: '',
        content:'',
        filename:''
      })
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
                   at:res.data.at
                   
                 });
             }
           );

           Axios.get(`http://localhost:9090/dangjang/qnacomment/view/${qna_seq}`)
           .then(
             res => {
                 console.log("댓글뷰"+res.data.content);  //f12 눌러서 확인하기 
                 setInputs({
                   qnaco_seq:res.data.qnaco_seq,
                   c_qna_seq:qna_seq,
                   c_title: res.data.title,
                   c_user_seq: res.data.user_seq,
                   c_content:res.data.content,
                   c_category_code :res.data.category_code,
                   c_image:res.data.image,
                   c_answer:res.data.answer,
                   c_at:res.data.at
                   
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
      
      frmData.append("user_seq", inputs.user_seq);
      frmData.append("content", inputs.c_content);
      frmData.append("qna_seq",inputs.qna_seq);
      
     
      Axios.post('http://localhost:9090/dangjang/qnacomment/insert/', frmData)
      .then(
          res =>{
            console.log(res.data);
            alert("등록되었습니다.");
            history('/qna/qna/qna/qnafree');
          } 
      );
    }
    const QnaWriteBtn = styled.div`

    .qnaWriteBtn{
      border : 0px;
      background-color : white;
      line-height: 32px;
      margin-bottom: 40px;
      margin-top : 30px;
      white-space: nowrap;
      color: #292a32;
      font-weight: bolder;
      border-radius: 10px;
      letter-spacing: -0.4px;
      line-height: 30px;
      font-size : 19px;
      width : auto;
      padding : 8px;
       
      margin-left:93%;
    }
    .qnaWriteBtn:hover{
      background-color:#e5e8eb;
      color : #6667ab;
    }
    label{
      line-height: 32px;
      text-decoration: none;
      list-style: none;
      white-space: nowrap;
      color: #292a32;
      font-weight: bolder;
      letter-spacing: -0.4px;
      margin-bottom : 10px;
      font-size : 1rem;
    }
    
    `;
   
  
    return (
      <div style={{display : 'inline-block', width : '78%', marginLeft:'7%', padding : '0px', verticalAlign: 'top'}}>
    
          <form name="myform" onSubmit={onSubmit}  encType="multipart/form-data">

                  <h1  style={{
                      lineHeight: '32px',
                      marginBottom: '40px',
                      marginTop: '100px',
                      textDecoration: 'none',
                      listStyle: 'none',
                      whiteSpace: 'nowrap',
                      color: '#292a32',
                      fontWeight: 'bolder',
                      letterSpacing: '-0.4px',
                                  }}>Q&A 답변달기</h1>
                        
                  <h2 style={{
                      lineHeight: '32px',
                      marginBottom: '40px',
                      marginTop: '100px',
                      textDecoration: 'none',
                      listStyle: 'none',
                      whiteSpace: 'nowrap',
                      color: '#292a32',
                      fontWeight: 'bolder',
                      letterSpacing: '-0.4px',
                                  }} className="qnalist-title" >Q. {inputs.title}</h2>

                      <div style={{
                        lineHeight: '32px',
                        marginBottom: '40px',
                        marginTop : '20px',
                        whiteSpace: 'nomal',
                        color: '#292a32',
                        fontWeight: 'bolder',
                        letteRpacing: '-0.4px',
                        
                        fontSize : '19px'
                    }} className="qnalist-contents">
                      {inputs.content}
                      </div>
            <hr/>
          

          
                      <div className="form-group">
                        <QnaWriteBtn>
                          
                          <label>답변 내용 </label>
                        </QnaWriteBtn>
                          <textarea class="form-control"
                            name="c_content" 
                            className="form-control"
                            value={inputs.c_content}
                            onChange={onChange}
                            rows="5" 
                            >

                          </textarea>
                        
                      </div>
            <br/>
            <input type="hidden" name = "qna_seq" value={inputs.qna_seq}></input> 
                <input type="hidden" name = "qnaco_seq" value={inputs.qnaco_seq}></input> 

            <div className="form-group">
            


            </div>

            <QnaWriteBtn>

              <div className="form-group">
                  <input type="submit" value="✏️등록 " 
                      className="qnaWriteBtn"/>
              </div>
            </QnaWriteBtn>
            
            
        </form>
        
       

       
      </div>
    );
  }

export default QnaCommentWrite;