import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect} from "react";
import Axios from "axios";
import styled from "styled-components";
import Chat from "../../IMG/Chat.png";

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
    margin: 0px 0px 0px 190px;
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
    width: 150px;
    display: flex;
    background-color: #6667ab;
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
    width: 36px;
    height: 36px;
    background-size: contain;
    margin: 0px 0px 0px 0px;
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
    margin: 0px 0px 0px 12px;
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

  .StyledLazyLoadingImage {
    width: 190px;
    height: 200px;
    overflow: hidden;
    display: block;
    box-sizing: border-box;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 3px;
    margin-right: 20px;
    background: rgb(248, 248, 248);
    transition: all 300ms ease 0s;
    top: 2px;
    left: 0px;
    border-width: 2px;
    float:left;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px;
    @media ${(props) => props.theme.tablet} {
      width: 153px;
      height: 221px;
      box-sizing: border-box;
    }
    @media ${(props) => props.theme.mobile} {
      position: relative;
      box-sizing: border-box;
      width: 114px;
      height: 164px;
    }
  }

  .StyledLazyLoadingImage img {
    vertical-align: top;
    width: 100%;
    height: 100%;
    opacity: 1;
    object-fit: cover;
    transition: opacity 420ms ease 0s;
    
  }
`;

function TopInfo(props, { match }) {
    let history = useNavigate ();
    let { board_seq } = useParams();
    //값을 초기화 시키되는 값.
    const [inputs, setInputs] = useState({
      board_seq:'',
      category_name:'',
      title: '',
      user_id: '',
      price:'',
      image1:'',
      zzim_cnt:'',
      user_images:'',
      hit:'',
      my_cnt:'',
      nick_name:'',
      address1:''
    });
  
    const { title, category_name, user_id, price, 
      image1, zzim_cnt, user_images, hit, my_cnt, nick_name, address1 } = inputs; // 비구조화 할당을 통해 값 추출
  
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
                    user_images: res.data.user_images,
                    price: res.data.price,
                    zzim_cnt: res.data.zzim_cnt,
                    image1:res.data.image1,
                    hit:res.data.hit,
                    my_cnt:res.data.my_cnt,
                    nick_name:res.data.nick_name,
                    address1:res.data.address1
                  });
              }
            );
      //console.log( heroState.hero );
    }, []);

  return (
    <PaneBox>
      <div className="WidthGrid">
        <div className="WidthRow">
          <div className="WidthCol">
          <div class="StyledLazyLoadingImage">
              <img class="StyledLazyLoadingImage img" alt="user 이미지" src={inputs.user_images}></img>
              </div>
            <div className="PaneInner">
              <h1 className="Title">{inputs.user_id}</h1>
              <div className="Detail">
                {inputs.nick_name} ・ {inputs.address1} ・ {inputs.my_cnt}개
              </div>
              <div className="ContentRatings">
                찜 ★ {inputs.zzim_cnt} ({inputs.hit} 명)
              </div>
              <div className="ButtonBlock">
                <div className="Self">
                  <button className="StylelessButton-ActionButton">
                    <div className="contentActionStatusImage">
                      <img className="StatusImage" src={Chat} alt=""></img>
                      <div onClick="" className="ActionStatus">
                        대화하기
                      </div>
                    </div>
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
