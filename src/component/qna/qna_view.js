import { NavLink, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect} from "react";
import Axios from "axios";
import styled from "styled-components";
import { useUserState } from "../member/UserContext";

function QnaView(props, {match} ){
  const QnaDeleteBtn = styled.div`

    .qnaDeleteBtn{
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
       
      margin-left:93%
    }
    .qnaDeleteBtn:hover{
      background-color:#e5e8eb;
      color : #6667ab;
  
    
    `;
  let history = useNavigate ();
  let { qna_seq } = useParams();
  const {  user } = useUserState();
  const [login_id,setLoginId] = useState("");
  const [login_seq,setLoginSeq] = useState("");
  const [login_role,setLoginRole] = useState("");

  useEffect(()=>{
    if(user!=null){
      setLoginId(user.userid);
      setLoginSeq(user.user_seq);
      setLoginRole(user.role);
      console.log(user.role);
    }
  }, [user])
  

  const [inputs, setInputs] = useState({
    qna_seq:'',
    title: '',
    user_seq: '',
    content:'',
    
    image:'',
    at:''
  });
  

  

 
  useEffect(() => { 
     
     
     console.log( qna_seq );

     Axios.get(`http://localhost:9090/dangjang/qna/view/${qna_seq}`)
          .then(
            res => {
                console.log("!!!!"+user.role);  //f12 눌러서 확인하기 
                setInputs({
                  qna_seq:qna_seq,
                  title: res.data.title,
                  user_seq: res.data.user_seq,
                  content:res.data.content,
                  category_code :res.data.category_code,
                  image:res.data.image,
                  answer:res.data.answer,
                  role:res.data.role,
                  qnaco_seq:res.data.qnaco_seq,
                  nick_name:res.data.nick_name
                });
            }
          );
          //console.log( heroState.hero );
        }, []);

        const deleteItem = (e)=>{
          console.log(`${inputs.qnaco_seq}`)
          if(window.confirm("삭제하시겠습니까?"))
          {
            Axios.get(`http://localhost:9090/dangjang/qnacomment/delete/${inputs.qnaco_seq}`)
                .then(
                  ()=>{
                    console.log('Deleted');
                    //history('/board');
                  }
                ).catch(err => console.log(err));
            //refreshPage();
            console.log("delete");  
          }
      }
        

      const refreshPage=()=>{ 
        window.location.reload(); 
      }
      // let login_id = user.userid;
      // let login_seq = user.user_seq;
      // 위에 let 함수를 useState 안에 담아줌
      const [admin_code,setAdminCode] = useState("");

      useEffect(()=>{
        if(user!=null){
          setLoginId(user.userid);
          setLoginSeq(user.user_seq);
          setAdminCode(user.role);
          console.log("어드민코드 : "+admin_code);
        }
      }, [user])


  
  

  return (
    <div style={{display : 'inline-block', width : '78%', marginLeft:'7%', padding : '0px', verticalAlign: 'top'}}>
  
      <form name="myform">
        <h2 className="qnalist-title">Q. {inputs.title}</h2>
        <img className="qna-image" src={inputs.image} alt={inputs.filename}/>
        <div className="qnalist-contents">
          {inputs.content}


        </div>
        {console.log("카테고리코드 : " + inputs.category_code)}
        {console.log("사용자 등급 : " + inputs.at)}
        {inputs.category_code === '09' ? <NavLink className="qnaBtn" to={"/qnaUpdate/"+inputs.qna_seq} > ✏️수정</NavLink>:  '' }
        
        </form>
        <br></br>
        <br></br>
        <hr/>
        { inputs.category_code==='09' ?(
          inputs.user_seq==='3'? '':
         <form name="myform" >
         <h2 className="qnalist-title">💌답변 </h2>

         <div className="qnalist-contents" style={{height : '200px'}}>
           {inputs.answer}
         </div>
          <QnaDeleteBtn>

         {login_role === 'USER' ? '' : 
         (inputs.answer==='⏱️ 답변을 기다려주세요' ?
         (inputs.category_code === '09' ? 
         <NavLink className="qnaBtn" to={"/qnacommentwrite/"+inputs.qna_seq} > ✏️작성</NavLink>:  ' ' ):
         <button  onClick={deleteItem} className="qnaDeleteBtn">🗑️삭제</button>) }
         </QnaDeleteBtn>
       
         </form>) : ''
         
        }
     
    </div>
  );
}

export default QnaView;
