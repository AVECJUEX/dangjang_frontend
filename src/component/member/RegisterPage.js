import React, { useState, useEffect } from "react";
import "./LoginRegister.css";
import signup from "../../IMG/signup_hw.png";
import { Avatar, Button } from "@mui/material";
import { PersonOutline } from "@mui/icons-material";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import PopupDom from '../post/PopupDom';
import PopupPostCode from '../post/PopupPostCode';
import styled from "styled-components";


// import { Avatar } from 'antd';
// import { UserOutlined } from '@ant-design/icons';

function RegisterPage() {
  const [userid, setUserid] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [nick_name, setNick_name] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [admincode, setAdmincode] = useState("");
  const [images, setImages] = useState("");
  const [msg , setMsg] = useState("");
  const [msgNickname , setMsgNickname] = useState("");
  
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDuplicate, setIsDuplicate] = useState('true');
  const [isDuplicateNickName, setIsDuplicateNickName] = useState('true');
  const [isShow, setIsShow] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fullAddress, setFullAddress] = useState("");
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

 
  
  const onUseridHandler = (event) => {
    setUserid(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPhoneHandler = (event) => {
    setPhone(event.currentTarget.value);
  };

  const onNicknameHandler = (event) => {
    setNick_name(event.currentTarget.value);
  };

  const onAddress1Handler = (event) => {
    setAddress1(event.currentTarget.value);
  };

  const onAddress2Handler = (event) => {
    setAddress2(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onZipcodeHandler = (event) => {
    setZipcode(event.currentTarget.value);
  };

  const onAdmincodeHandler =(event) => {
    setAdmincode(event.currentTarget.value);
  };
  const onImagesHandler = (event) => {
    setImages(event.currentTarget.value);
  };

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return alert("비밀번호와 비밀번호확인은 같아야 합니다.");
    }
    const frmData = new FormData(event.currentTarget);
    const {data} = await axios.post("http://127.0.0.1:9090/dangjang/member/insert", frmData);
    console.log("[회원가입]", data);
    if (data.result === "success") {
      alert("회원 가입이 완료되었습니다.");
      navigate("/");
    } else {
      alert("회원 가입 에러");
    }

  };
  const  DuplicateCheck = async() => {
  const res =  await axios.get(`http://127.0.0.1:9090/dangjang/member/isDuplicate?userid=${userid}`);

    console.log(res.data.result);
    
    if(res.data.result ===  'true'){
      setIsDuplicate('true'); 
      setMsg('이미 사용 중인 아이디 입니다.');
    } else {
      setIsDuplicate('false');
      setMsg('사용 가능한 아이디 입니다.');
    }

    //console.log( isDuplicate );
    setIsShow(!isShow);
  }

  const  DuplicateCheckNickName = async() => {
   
    // axios 로 디비에 id  중복 체크 확인
    // db 응답값 : result
    // result - success : 사용가능(중복된 아이디 없음)
    // result - fail : 사용불가능(중복된 아이디 있음)
    //const result = {userid:userid.value};
    //axios.get("http://127.0.0.1:9090/dangjang/member/isDuplicate?userid=${userid.value}", result)

    const res =  await axios.get(`http://127.0.0.1:9090/dangjang/member/isDuplicateNickName?nick_name=${nick_name}`);

    console.log(res.data.result);
    
    if(res.data.result ===  'true'){
      setIsDuplicateNickName('true'); 
      setMsgNickname('이미 사용 중인 닉네임 입니다.');
    } else {
      setIsDuplicateNickName('false');
      setMsgNickname('사용 가능한 닉네임 입니다.');
    }

    //console.log( isDuplicate );
    setIsShow(!isShow);
  }

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
      <form onSubmit={onSubmit} encType="multipart/form-data" style={{width :'100%',textAlign:'center '}}>
        <br/>
        <br/>
      <img className="signupLogo" src={signup} alt=""></img>
      <div
        style={{
          width: "auto",
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
            style={{ width: "330px",height:"auto", padding: "10px" }}
          />
        )}
        {!imageSrc && (
          <Avatar
            sx={{
              m: 1,
              width: 80,
              height: 80,
            }}
          >
            <PersonOutline />
          </Avatar>
        )}
      </div>

      <div>
        <Button  component="label" style={{
           lineHeight: '32px',
           textDecoration: 'none',
           listStyle: 'none',
           whiteSpace: 'nowrap',
           color: '#292a32',
           fontWeight: 'bolder',
           letterSpacing: '-0.4px',
           lineHeight: '30px',
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
            name="userid"
            type="text"
            placeholder="아이디"
            value={userid}
            onChange={onUseridHandler}
            class="signup_input"
            autocomplete="off"
          />
          <br/>
          <button className="mainButton" type="button" onClick={DuplicateCheck}>중복 체크</button>
          {/* {isShow && (isDuplicate === true ? )} */}
          <p className="ptag">{msg}</p>
          {/*  <p className="ptag">사용가능 아이디</p>:<p>사용불가능 아이디</p> */}
          
          
        </div>
        <div>
          <input
            name="name"
            type="text"
            placeholder="이름"
            value={name}
            onChange={onNameHandler}
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
            onChange={onPasswordHandler}
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
            onChange={onConfirmPasswordHandler}
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
            onChange={onNicknameHandler}
            class="signup_input"
            autocomplete="off"
          />
          <br/>
          <button className="mainButton" type="button" onClick={DuplicateCheckNickName}>중복 체크</button>
          <p className="ptag">{msgNickname}</p>
          {/* {isShow && (isDuplicate === true ? 
          <p className="ptag">사용 가능합니다</p>:<p>사용 중입니다</p>)} */}
          
        </div>

        <div>
          <input
            name="email"
            type="text"
            placeholder="이메일"
            value={email}
            onChange={onEmailHandler}
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
            onChange={onPhoneHandler}
            class="signup_input"
            autocomplete="off"
          />
        </div>
        
        <div>
        	
          <button className="zipButton" type='button' onClick={openPostCode}>주소 검색</button>
          
          <div id='popupDom' >
              {isPopupOpen && (
                   <PopupDom style={{"border":"1px solid red"}}>
                      <PopupPostCode setAddress1={setAddress1} setZipcode={setZipcode} onClose={closePostCode} />
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
            onChange={onZipcodeHandler}
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
            onChange={onAddress1Handler}
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
            onChange={onAddress2Handler}
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
            onChange={onAdmincodeHandler}
            class="signup_input"
            autocomplete="off"
          />
        </div>
      <MyinfoUpdateBtn>
        <div>
          <button
          style={{width : '120px'}}
            type="submit"
            class="register__button"
          >
            계정 생성하기
          </button>
          &nbsp;&nbsp;

          <NavLink className="qnaBtn" to="/" > 돌아가기</NavLink>
        
        </div>
          </MyinfoUpdateBtn>


      </form>
    </div>
  );
}
export default RegisterPage;
