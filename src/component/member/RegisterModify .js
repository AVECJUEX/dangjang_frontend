import React, { useState, useEffect } from "react";
import "./LoginRegister.css";
import modify from "../../IMG/modify.png";
import { Avatar, Button } from "@mui/material";
import { PersonOutline } from "@mui/icons-material";
import Axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import PopupDom from '../post/PopupDom';
import PopupPostCode from '../post/PopupPostCode';
import styled from "styled-components";
import { useUserState } from "./UserContext";

// import { Avatar } from 'antd';
// import { UserOutlined } from '@ant-design/icons';

function RegisterModify() {
  let history = useNavigate();

  const { user } = useUserState();
    let login_id = user.userid;
    let login_seq = user.user_seq;
    console.log("세션값 테스트 !!!!!!!! : " + login_id);

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
    frmData.append("user_seq", user_seq);
    frmData.append("userid", "test1");
    const {data} = await Axios.post("http://127.0.0.1:9090/dangjang/member/update", frmData);
    console.log("[정보 수정]", data);
    if (data.result === "success") {
      alert("수정 되었습니다.");
      navigate("/");
    } else {
      alert("수정 에러");
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

  const [addr, setAddress1] = useState("");
  const [zipcd, setZipcode] = useState("");

  useEffect(() => { 
       
       
    console.log( login_id );

    Axios.get(`http://localhost:9090/dangjang/member/view/${login_id}`)
         .then(
           res => {
             console.log("11111111111111111111111"+res.data.info.address2);  //f12 눌러서 확인하기 
             console.log(res.data.info.images);
               setInputs({
                userid:res.data.info.userid,
                name:res.data.info.name,
                email:res.data.info.email,
                password:res.data.info.password,
                phone:res.data.info.phone,
                address1:res.data.info.address1,
                address2:res.data.info.address2,
                zipcode:res.data.info.zipcode,
                nick_name:res.data.info.nick_name,
                admincode:res.data.info.admincode,
                images:res.data.info.images,
                confirmPassword:res.data.info.confirmPassword,
                fullAddress:res.data.info.fullAddress
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


useEffect(()=>{
  
  console.log('반환값:', addr, zipcd)
  setInputs((prev)=>({...prev,address1:addr}));
  setInputs((prev)=>({...prev,zipcode:zipcd}));
}, [addr,zipcd])

useEffect(()=>{
console.log('반환값2:', inputs);
}, [inputs]);


  return (
    <div class="loginregister">
      <form onSubmit={onSubmit} encType="multipart/form-data" style={{width :'100%',textAlign:'center '}} >
        <br/>
        <br/>
      <img className="modifyLogo" src={modify} alt=""></img>
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
        {images && (
          <img
            src={images}
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
          />
          <br/>
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
