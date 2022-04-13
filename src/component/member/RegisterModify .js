import React, { useState, useEffect } from "react";
import "./LoginRegister.css";
import signup from "../../IMG/signup_hw.png";
import { Avatar, Button } from "@mui/material";
import { PersonOutline } from "@mui/icons-material";
import Axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import PopupDom from '../post/PopupDom';
import PopupPostCode from '../post/PopupPostCode';
import styled from "styled-components";

// import { Avatar } from 'antd';
// import { UserOutlined } from '@ant-design/icons';

function RegisterModify() {
  let history = useNavigate();

  const [user_seq, setUser_seq]= useState("1");
  const [images, setImages] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [imageSrc, setImageSrc] = useState('');
  
// 팝업창 열기
  const openPostCode = () => {
      setIsPopupOpen(true)
  }

// 팝업창 닫기
  const closePostCode = () => {
      setIsPopupOpen(false)

      // setFullAddress("ddddddd");
      // setPassword("33333333333333333");

      // console.log("**************" + fullAddress);
      // console.log("**************" + password);
      // console.log("**************" + isPopupOpen);

  }

   // 사진 미리보기
   const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const [inputs, setInputs] = useState({
    userid:'',
    name:'',
    email:'',
    password:'',
    phone:'',
    address1:'',
    address2:'',
    zipcode:'',
    nick_name:'',
    admincode:'',
    images:'',
    confirmPassword:'',
    fullAddress:''
  });

  //input에 저장된 값을 해체한다
  //title = inputs.title
  //user_seq = input.user_seq
  const { userid, name,email,password,phone,address1,address2,nick_name,zipcode,admincode,image,confirmPassword,fullAddress } = inputs; 

  
 

  const navigate = useNavigate();


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
  const onSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return alert("비밀번호와 비밀번호확인은 같아야 합니다.");
    }
    const frmData = new FormData(event.currentTarget);
    const {data} = await Axios.post("http://127.0.0.1:9090/dangjang/member/update", frmData);
    console.log("[회원가입]", data);
    if (data.result === "success") {
      alert("회원 가입이 완료되었습니다.");
      navigate("/");
    } else {
      alert("회원 가입 에러");
    }

  };

  const DuplicateCheck = () => {
    
    // axios 로 디비에 id  중복 체크 확인
    // db 응답값 : result
    // result - success : 사용가능(중복된 아이디 없음)
    // result - fail : 사용불가능(중복된 아이디 있음)
    const result = 'fail';
    if(result === 'success' ){
      setIsDuplicate(false);
    } else {
      setIsDuplicate(true);
    }
    setIsShow(!isShow);
  }

  useEffect(() => { 
       
       
    console.log( user_seq );

    Axios.get(`http://localhost:9090/dangjang/member/view/${user_seq}`)
         .then(
           res => {
               console.log("11111111111111111111111"+res.data.address2);  //f12 눌러서 확인하기 
               setInputs({
                userid:res.data.userid,
                name:res.data.name,
                email:res.data.email,
                password:res.data.password,
                phone:res.data.phone,
                address1:res.data.address1,
                address2:res.data.address2,
                zipcode:res.data.zipcode,
                nick_name:res.data.nick_name,
                admincode:res.data.admincode,
                images:res.data.images,
                confirmPassword:res.data.confirmPassword,
                fullAddress:res.data.fullAddress
               });
          
            }
         );

   //console.log( heroState.hero );
 }, []); //

 const MyinfoUpdateBtn = styled.div`
 a{
  
  line-height: 32px;
  margin-bottom: 30px;
  text-decoration: none;
  list-style: none;
  white-space: nowrap;
  color: #8b95a1;
  letter-spacing: -0.4px;
  line-height: 30px;
  font-size: 18px;
  font-weight: 600;
  
  vertical-align: baseline;
  border-radius: 10px;
  display : block;
  
  padding:0px;
  display : inline-block
  
 }
 .qnaBtn{
  line-height: 32px;
  margin-top : 20px;
  white-space: nowrap;
  color: #292a32;
  font-weight: bolder;
  letter-spacing: -0.4px;
  line-height: 30px;
  font-size : 19px;
  padding : 8px;
  text-align : center;  
  width : auto;
  text-decoration: none;
  border-radius: 10px;
}
.qnaBtn:hover{
background-color:#e5e8eb;
color : #6667ab;

}
`;

  return (
    <div class="loginregister">
      <form onSubmit={onSubmit} encType="multipart/form-data" style={{width :'100%',textAlign:'center '}} >
        <br/>
        <br/>
      <img className="signupLogo" src={signup} alt=""></img>
      <div
        style={{
          width: "75%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign:'center '
        }}
      >
        {imageSrc && (
          <img
            src={imageSrc}
            alt="preview-img"
            style={{ width: "250px", padding: "10px" }}
          />
        )}
        {!imageSrc && (
          <Avatar
            sx={{
              m: 1,
              width: 56,
              height: 56,
            }}
          >
            <PersonOutline />
          </Avatar>
        )}
      </div>

      <div>
        <Button  component="label" style={{
          width: "75%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color : "#000000"
        }}>
          프로필에 사용할 사진을 입력하세요!
          <input
            id="file"
            name="file"
            type="file"
            accept="img/*"
            hidden
            onChange={(e) => encodeFileToBase64(e.target.files[0])}
          />
        </Button>
      </div>


      
        <div>
          <input
            name="name"
            type="text"
            placeholder="이름"
            value={name}
            onChange={onChange}
            class="signup_input"
            autocomplete="off"
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onChange}
            class="signup_input"
            autocomplete="off"
            />
        </div>
        <div>
          <input
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={onChange}
            class="signup_input"
            autocomplete="off"
            />
        </div>
        { (password && confirmPassword) &&
          (password===confirmPassword?
          <p className="ptag">{"같습니다"}</p>: <p className="ptag">{"다릅니다"}</p>)}
        
        <div>
          <input
            name="nick_name"
            type="text"
            placeholder="닉네임"
            value={nick_name}
            onChange={onChange}
            class="signup_input"
            autocomplete="off"
          /><br/>
          <button className="mainButton" type="button" onClick={DuplicateCheck}>중복 체크</button>
          {isShow && (isDuplicate === true ? 
          
          <p className="ptag">사용 가능합니다</p>:<p>사용 중입니다</p>)}
          
        </div>

        <div>
          <input
            name="email"
            type="text"
            placeholder="이메일"
            value={email}
            onChange={onChange}
            class="signup_input"
            autocomplete="off"
          />
        </div>

        <div>
          <input
            name="phone"
            type="text"
            placeholder="전화번호"
            value={phone}
            onChange={onChange}
            class="signup_input"
            autocomplete="off"
          />
        </div>
        
        <div>
        	
          <button className="zipButton" type='button' onClick={openPostCode}>주소 검색</button>
          
          <div id='popupDom' >
              {isPopupOpen && (
                   <PopupDom style={{"border":"1px solid red"}}>
                      <PopupPostCode setAddress1={address1} setZipcode={address2} onClose={closePostCode} />
                  </PopupDom>
              )}
          </div>
      </div>
      
        <div>
          <input
            name="zipcode"
            type="text"
            placeholder="우편번호"
            value={zipcode}
            onChange={onChange}
            class="signup_input"
            autocomplete="off"
          />
        </div>
        
        <div>
          <input
            name="address1"
            type="text"
            placeholder="주소"
            value={address1}
            onChange={onChange}
            class="signup_input"
            autocomplete="off"
          />
        </div>
        
        <div>
          <input
            name="address2"
            type="text"
            placeholder="상세 주소"
            value={address2}
            onChange={onChange}
            class="signup_input"
            autocomplete="off"
          />
        </div>

        <div>
          <input
            name="admincode"
            type="text"
            placeholder="admincode"
            value={admincode}
            onChange={onChange}
            class="signup_input"
            autocomplete="off"
          />
        </div>
              
          <MyinfoUpdateBtn>
        <div>
          <button
          style={{width : '100px'}}
            type="submit"
            class="register__button"
            >
            수정하기
          </button>
          &nbsp;&nbsp;
          
          
          <NavLink className="qnaBtn" to="/mypage" > 돌아가기</NavLink>
        </div>
          </MyinfoUpdateBtn>
            


      </form>
    </div>
  );
}
export default RegisterModify;
