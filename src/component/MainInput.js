import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const InputContainer = styled.input`
  width: 100%;
  font-size: ${(props) => props.fontSize};
  font-weight: 600;
  letter-spacing: -0.3px;
  line-height: 23px;
  background: rgb(0, 0, 0, 0);
  padding: 0px 0px 1px;
  border: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  caret-color: rgb(53, 53, 53);
`;



function MainInput({ placeholder, width, name, value, history, fontSize}) {

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    keyword: ''
  });
  
  const { keyword  } = inputs; 

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

  const onKeyPress=(e)=>{
    if(e.key==='Enter'){
    alert("준비중입니다.");
    
    };
  }
 
  return (
    <InputContainer
      fontSize={fontSize}
      // onChange={onChange}
      // onKeyPress={handleEnterPress}
      name={name}
      value={value}
      placeholder={placeholder}
      width={width}
      onChange={onChange}
      onKeyPress={onKeyPress}
    ></InputContainer>
  );
}

export default MainInput;
