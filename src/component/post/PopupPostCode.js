import React from 'react';
import DaumPostcode from "react-daum-postcode";
import "../member/LoginRegister.css";
 import styled from "styled-components";

const PopupPostCode = (props) => {
	// 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        // props.data=data;
        props.setAddress1(fullAddress);
        props.setZipcode(data.zonecode);
        // props.zonecode = zonecode;
        
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)
        props.onClose()
    }

      const Container = styled.div`
      position: fixed;
      top: 10%;
      width: 100%;
      height: 100%;
      z-index: 1000;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.5);
    `;
    
    // const Container = styled.div`
    //   margin-top:15%;
    //   width: 100%;
    //   height: 500px;
    //   display: flex;
    //   position: relative;
    //   flex-direction: column;
    //   align-items: center;
    //   background: rgba(0, 0, 0, 0.5);
    
    // `;
    
    const Contents = styled.div`
      padding: 0 auto;
      border-radius: 10px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
      background-color: white;
      text-align: center;
      width: 500px;
      height: 500px;
      display: flex;
      flex-direction: column;
    
      .loginBtn {
        padding: 0px;
        margin: 0px;
        cursor: pointer;
        color: #00000;
        font-size: 17px;
        font-weight: 500;
      }
      .SignInBtn {
        padding: 0px;
        margin: 0px;
        cursor: pointer;
        color: #00000;
        font-size: 17px;
        font-weight: 500;
      }
      .loginregister__button {
        background-color: #6667ab;
        color: rgb(255, 255, 255);
        font-weight: 700;
        width: 95%;
        border-radius: 40px;
        height: 48px;
        margin-top: 10px;
      }
     
      .modalLogo {
        object-fit: cover;
        width: auto;
        height: 100px;
      }
      .findregister__button {
        background-color: #6667ab;
        color: rgb(255, 255, 255);
        font-weight: 700;
        width: 30%;
        border-radius: 40px;
        height: 48px;
        margin-top: 10px;
      }
    `;

     
    const postCodeStyle = {
      // display: "block",
      //position: "fixed",
      top: "10%",
      width: "600px",
      height: "600px",
      padding: "7px",
      display:"flex", 
      justifyContent:"center", 
      alignItems:"center",
      flexDirection:"row"
      
    };


    return(
      <Container>
        <div style={{postCodeStyle}}>
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode}/>
              {/* 닫기 버튼 생성 */}
        </div>
        <button style={{position:"absolute", zIndex:"10000", marginTop:"400px"}} type='button' onClick={() => {props.onClose()}} className="mainButton">닫기</button>
        </Container>
    )
}
 
export default PopupPostCode;