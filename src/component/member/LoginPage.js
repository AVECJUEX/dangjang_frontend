import React, {useState} from 'react'
import "./LoginRegister.css"
import loginLogoPath from "../../IMG/logo.png";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
}

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
      <div class="loginregister">
        <form>
            <img src={loginLogoPath} alt=""></img>
            <div><input name="email" type="email" placeholder="아이디를 입력해주세요" value={email} onChange={onEmailHandler} class="loginregister__input"/></div>
            <div><input name="password" type="password" placeholder="비밀번호를 입력해주세요" value={password} onChange={onPasswordHandler} class="loginregister__input"/></div>
            <div><button type="submit" onSubmit={onSubmit} class="loginregister__button">로그인</button></div>
            <div><button type="submit" onSubmit={onSubmit} class="loginregister__button">회원가입</button></div>
            <div><button type="submit" onSubmit={onSubmit} class="loginregister__button">ID/PW 찾기</button></div>
        </form>
      </div>
    );
  }

export default LoginPage;