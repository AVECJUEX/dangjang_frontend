
import { Link, useNavigate, useParams } from "react-router-dom";
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
      <div>
        <form name="myform" onSubmit={onSubmit}>
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
                  <label>file: </label>
                  <input type="file"
                    name="filename" 
                    className="form-control"
                   
                    onChange={onChange}
                    />
                  <img src={inputs.image} alt={inputs.filename}/>

              </div>
              
              <div className="form-group">
                  <input type="submit" value="등록 " className="btn btn-primary"/>
              </div>
          </form>

        <div>
          <b>값: </b>
          {title} <br/>
          {user_seq} <br/>
          {content} <br/>
        </div>
      </div>
    );
  }

export default BoardView;
