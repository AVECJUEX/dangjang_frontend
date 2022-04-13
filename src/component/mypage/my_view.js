import { NavLink, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect} from "react";
import Axios from "axios";

function QnaView(props, {match} ){
  let history = useNavigate ();
  let { qna_seq } = useParams();

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
                console.log("!!!!"+res.data.qnaco_seq);  //f12 눌러서 확인하기 
                setInputs({
                  qna_seq:qna_seq,
                  title: res.data.title,
                  user_seq: res.data.user_seq,
                  content:res.data.content,
                  category_code :res.data.category_code,
                  image:res.data.image,
                  answer:res.data.answer,
                  at:res.data.at,
                  qnaco_seq:res.data.qnaco_seq
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
 
const sessionAt = '1 ';
  

  return (
    <div style={{display : 'inline-block', width : '78%', marginLeft:'7%', padding : '0px', verticalAlign: 'top'}}>
  
      <form name="myform">
        <h2 className="qnalist-title">Q. {inputs.title}</h2>
        <img src={inputs.image} alt={inputs.filename}/>
        <div className="qnalist-contents">
          {inputs.content}


        </div>
        {console.log("카테고리코드 : " + inputs.category_code)}
        {console.log("사용자 등급 : " + inputs.at)}
        {inputs.category_code === '09' ? <NavLink className="qnaBtn" to={"/qnaUpdate/"+inputs.qna_seq} > ✏️수정</NavLink>:  '' }
        
        </form>
        <br></br>
        <hr/>
        <br></br>
        {
          inputs.user_seq==='3'? '':
         <form name="myform" >
         <h2 className="qnalist-title">💌답변 </h2>

         <div className="qnalist-contents" style={{height : '200px'}}>
           {inputs.answer}
         </div>

         {sessionAt === '2' ? '' : 
         (inputs.answer==='⏱️ 답변을 기다려주세요' ?
          (inputs.category_code === '09' ? 
          <NavLink className="qnaBtn" to={"/qnacommentwrite/"+inputs.qna_seq} > ✏️작성</NavLink>:  ' ' ):
          <button  onClick={deleteItem} className="qnaBtn">삭제</button>) }
       
         </form>
         
        }
     
    </div>
  );
}

export default QnaView;
