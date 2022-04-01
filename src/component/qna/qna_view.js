
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect} from "react";
import Axios from "axios";

function BoardView(props, {match} ){

    let history = useNavigate ();
    let { qna_seq } = useParams();

    const [inputs, setInputs] = useState({
      qna_seq:'',
      title: '',
      user_seq: '',
      content:'',
     
      image:''
    });
  
    const { title, user_seq,content,  image  } = inputs; // 비구조화 할당을 통해 값 추출
  
    const onChange = (e) => {
      const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
      console.log(value, name);
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
                  console.log(res.data);  //f12 눌러서 확인하기 
                  setInputs({
                    qna_seq:qna_seq,
                    title: res.data.title,
                    user_seq: res.data.user_seq,
                    content:res.data.content,
                    category_code :res.data.category_code,
                    image:res.data.image,
                  });
              }
            );

      //console.log( heroState.hero );
    }, []);

    const onSubmit=(e)=> {
      e.preventDefault();
      var frmData = new FormData(); 
      frmData.append("qna_seq", inputs.qna_seq);
      frmData.append("title", inputs.title);
      frmData.append("user_seq", inputs.user_seq);
      frmData.append("content", inputs.content);

     
      
      frmData.append("image", document.myform.image.files[0]);
      
      Axios.post('http://localhost:9090/dangjang/qna/update/', frmData)
            .then(
              res => {
                console.log(res.data);
               history('/qna');
              }
            );
    }
    
  
    return (
      <div style={{display : 'inline-block', width : '78%', marginLeft:'7%', padding : '0px', verticalAlign: 'top'}}>
    
        <form name="myform" onSubmit={onSubmit}>
          <h2 className="qnalist-title">Q. {inputs.title}</h2>

          <div className="qnalist-contents">
            {inputs.content}


          </div>
          {console.log("카테고리코드 : " + inputs.category_code)}
          {inputs.category_code === '09' ? <NavLink className="qnaBtn" to="/qna/write" > ✏️수정</NavLink>:  '' }
          
          </form>

       
      </div>
    );
  }

export default BoardView;
