import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect} from "react";
import Axios from "axios";
import styled from "styled-components";

const PaneBox = styled.div`
  text-align: center;
  padding: 14px 16px 22px;

  .WidthGrid {
    max-width: 960px;
    margin: 0 auto;

    @media ${(props) => props.theme.tablet} {
      max-width: 640px;
    }

    @media ${(props) => props.theme.mobile} {
      max-width: auto;
    }
  }

  .WidthRow {
    margin: 0 -8px;

    @media ${(props) => props.theme.tablet} {
      margin: 0;
    }
  }

  .WidthCol {
    padding: 0 8px;

    @media ${(props) => props.theme.tablet} {
      padding: 0;
    }
  }

  .PaneInner {
    text-align: left;
    margin: 0px 0px 0px 191px;
    &:after {
      display: block;
      content: "";
      clear: both;
    }

    @media ${(props) => props.theme.tablet} {
      margin: 0px 0px 0px 173px;
    }

    @media ${(props) => props.theme.mobile} {
      text-align: center;
      margin: 0;
    }
  }

  .Title {
    width: 520px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 33px;
    font-weight: 700;
    letter-spacing: -1.2px;
    line-height: 40px;

    @media ${(props) => props.theme.tablet} {
      font-size: 25px;
      letter-spacing: -0.9px;
      line-height: 30px;
    }

    @media ${(props) => props.theme.mobile} {
      width: auto;
    }
  }

  .Detail {
    font-size: 17px;
    font-weight: 400;
    letter-spacing: -0.7px;
    line-height: 22px;
    margin-top: 4px;
    color: rgba(0, 0, 0, 0.5);
    box-sizing: border-box;

    @media ${(props) => props.theme.tablet} {
      font-size: 15px;
      letter-spacing: -0.5px;
      line-height: 20px;
      margin-top: 3px;
    }
  }

  .ContentRatings {
    font-size: 17px;
    font-weight: 400;
    letter-spacing: -0.7px;
    line-height: 22px;
    padding: 8px 0px;
    border-top: 1px solid rgb(237, 237, 237);
    border-bottom: 1px solid rgb(237, 237, 237);
    box-sizing: border-box;
    margin-top: 14px;
  }

  .ButtonBlock {
    float: left;
    margin: 39px 30px 0px 0px;

    @media ${(props) => props.theme.tablet} {
      margin: 39px 21px 0px 0px;
    }

    @media ${(props) => props.theme.mobile} {
      float: none;
      margin: 19px 0px 14px;
    }
  }

  .Self {
    width: 254px;
    display: flex;
    background-color: rgb(255, 47, 110);
    vertical-align: top;
    box-sizing: border-box;
    height: 40px;
    border-radius: 6px;
    margin: 0px auto;
    overflow: hidden;

    @media ${(props) => props.theme.tablet} {
      width: 213px;
    }

    @media ${(props) => props.theme.mobile} {
      width: 254px;
    }
  }

  .StylelessButton-ActionButton {
    background: none;
    padding: 0px;
    border: none;
    margin: 0px;
    cursor: pointer;
    flex: 1 1 0%;
    color: rgb(246, 246, 246);
    text-align: center;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: -0.7px;
    line-height: 22px;
    height: 100%;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  .contentActionStatusImage {
    display: flex;
    position: relative;
    left: -8px;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    justify-content: center;
  }

  .StatusImage {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: contain;
    margin: 0px 6px 0px 0px;
    transition: all 300ms ease 0s;
  }

  .ActionStatus {
    display: inline-flex;
    justify-content: center;
    cursor: pointer;
    color: rgb(246, 246, 246);
    text-align: center;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: -0.7px;
    line-height: 22px;
  }

  .StylelessButton-ActionDropDownButton {
    background: none;
    border: none;
    margin: 0;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    box-sizing: border-box;
    width: 51px;
    height: 100%;
    padding: 8px 0;
    border-left: 1px solid #e71252;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

function TopInfo(props, { match }) {
    let history = useNavigate ();
    let { board_seq } = useParams();

    const [inputs, setInputs] = useState({
      board_seq:'',
      category_name:'',
      title: '',
      user_id: '',
      price:'',
      image1:'',
      zzim_cnt:'',
      user_seq:'',
      hit:''
    });
  
    const { title, category_name, user_id, price, 
      image1, zzim_cnt, user_seq, hit } = inputs; // 비구조화 할당을 통해 값 추출
  
    const onChange = (e) => {
      const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
      console.log(value, name);
      setInputs({
        ...inputs, // 기존의 input 객체를 복사한 뒤
        [name]: value // name 키를 가진 값을 value 로 설정
      });
    };
  
    useEffect(() => { 
       console.log( board_seq );
       Axios.get(`http://localhost:9090/dangjang/board/view/${board_seq}`)
            .then(
              res => {
                  console.log(res.data);  //f12 눌러서 확인하기 
                  setInputs({
                    board_seq:board_seq,
                    title: res.data.title,
                    category_name: res.data.category_name,
                    user_id: res.data.user_id,
                    user_seq: res.data.user_seq,
                    price: res.data.price,
                    zzim_cnt: res.data.zzim_cnt,
                    image1:res.data.image1,
                    hit:res.data.hit
                  });
              }
            );
      //console.log( heroState.hero );
    }, []);

    const onSubmit=(e)=> {
      e.preventDefault();
      var frmData = new FormData(); 
      frmData.append("board_seq", inputs.board_seq);
      frmData.append("title", inputs.title);
      frmData.append("user_id", inputs.user_id);
      frmData.append("content", inputs.content);
      frmData.append("category_name", inputs.category_name);
      frmData.append("price", inputs.price);
      frmData.append("zzim_cnt", inputs.zzim_cnt);
      frmData.append("hit", inputs.hit);
      frmData.append("image1", inputs.imgae1);

      console.log( document.myform.filename.files );
      
      frmData.append("file", document.myform.filename.files[0]);
      
      Axios.post('http://localhost:9090/board/update/', frmData)
            .then(
              res => {
                console.log(res.data);
               history('/board');
              }
            );
    }

  return (
    <PaneBox>
      <div className="WidthGrid" onSubmit={onSubmit}>
        <div className="WidthRow">
          <div className="WidthCol">
            <div className="PaneInner">
              <h1 className="Title">{inputs.title}</h1>
              <div className="Detail">
                {inputs.user_id} ・ {inputs.category_name} ・ {inputs.price}원
              </div>
              <div className="ContentRatings">
                찜 ★ {inputs.zzim_cnt} ({inputs.hit} 명)
              </div>
              <div className="ButtonBlock">
                <div className="Self">
                  <button className="StylelessButton-ActionButton">
                    <div className="contentActionStatusImage">
                      <img className="StatusImage" src={inputs.image1} alt=""></img>
                      <div onClick="" className="ActionStatus">
                        보고싶어요
                      </div>
                    </div>
                  </button>
                  <button className="StylelessButton-ActionDropDownButton">
                    <img src="" alt=""></img>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PaneBox>
  );
}

export default TopInfo;
