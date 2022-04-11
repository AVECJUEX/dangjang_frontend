import React, { useState } from "react";
import "./LoginRegister.css";
import signup from "../../IMG/signup_hw.png";
import { Avatar, Button } from "@mui/material";
import { PersonOutline } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import PopupDom from '../post/PopupDom';
import PopupPostCode from '../post/PopupPostCode';
import Test from '../post/Test';

// import { Avatar } from 'antd';
// import { UserOutlined } from '@ant-design/icons';

function RegisterPage() {
  const [userid, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [nick_name, setNick_name] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [role, setRole] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

 
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

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
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

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return alert("비밀번호와 비밀번호확인은 같아야 합니다.");
    }
    // const frmData = new FormData(event.currentTarget);
    // const {data} = await axios.post("http://127.0.0.1:9090/dangjang/member/insert", frmData);
    // console.log("[회원가입]", data);
    // if (data.result === "success") {
    //   alert("회원 가입이 완료되었습니다.");
    //   navigate("/");
    // } else {
    //   alert("회원 가입 에러");
    // }

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


   

  return (
    <div class="loginregister">
      <form>
      <img className="signupLogo" src={signup} alt=""></img>
      <div
        style={{
          width: "75%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {imageSrc && (
          <img
            src={imageSrc}
            alt="preview-img"
            style={{ width: "100px", padding: "10px" }}
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
        <Button variant="contained" component="label">
          사진 업로드
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
            onChange={onIdHandler}
            class="signup_input"
            autocomplete="off"
          />
          <button className="mainButton" type="button" onClick={DuplicateCheck}>중복 체크</button>
          {isShow && (isDuplicate === true ? 
          
          <p className="ptag">사용불가능 아이디</p>:<p>사용가능 아이디</p>)}
          
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
            name="email"
            type="email"
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
            type="phone"
            placeholder="전화번호"
            value={phone}
            onChange={onPhoneHandler}
            class="signup_input"
            autocomplete="off"
          />
        </div>
        
        <div>
          <input
            name="email"
            type="email"
            placeholder="주소"
            value={phone}
            onChange={onPhoneHandler}
            class="signup_input"
            autocomplete="off"
          />
          <Test/>
        </div>
        
        <div>
          <button
            type="submit"
            onSubmit={onSubmit}
            class="register__button"
          >
            계정 생성하기
          </button>
          &nbsp;&nbsp;

          <button className="mainButton" type="button">돌아가기</button>
        </div>


      </form>
    </div>
  );
}
export default RegisterPage;
