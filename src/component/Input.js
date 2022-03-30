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

function Input({ placeholder, width, name, value, history, fontSize }) {
 
  return (
    <InputContainer
      fontSize={fontSize}
      // onChange={onChange}
      // onKeyPress={handleEnterPress}
      name={name}
      value={value}
      placeholder={placeholder}
      width={width}
    ></InputContainer>
  );
}

export default Input;
