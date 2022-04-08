import { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import './Feed.css'
// import StoryReel from "./StoryReel"
// import MessageSender from "./MessageSender"
import Post from "./Post"


/**
 dto

 	private long free_seq=-1;
	private String user_id="";
	private String title="";
	private String content="";
	private String image="";
	private String wdate="";
	private String like_cnt="";
	private String hit="";
	private String user_seq="";
 */
function Feed({ free_seq, user_id, title, content, image, wdate, like_cnt, hit, user_seq}) {

    // 변수
    // const [inputs, setInputs] = useState({
    //     free_seq:'',
    //     user_id: '',
    //     title: '',
    //     content:'',
    //     image:'',
    //     wdate:'',
    //     like_cnt:'',
    //     hit:'',
    //     user_seq:'',
    //   });

      const [freeboardList, setFreeboardList] = useState([]);
    
      //const { free_seq, user_id, title, content, image, wdate, like_cnt, hit, user_seq} = inputs; // 비구조화 할당을 통해 값 추출
  
      // 최초한번
      useEffect(() => { 
         console.log( free_seq );
  
         Axios.get(`http://localhost:9090/dangjang/freeboard/list/1`)
  
              .then(
                res => {
                    //res.data.total
                    //res.data.list
                    
                    console.log(res.data);  //f12 눌러서 확인하기 
                    console.log(res.data.list.length);  //f12 눌러서 확인하기 
                    
                    res.data.list.map((data)=>{
                        console.log(data.title, data.content)
  
                        // setter 함수
                        // setInputs({
                        //   free_seq:free_seq,
                        //   user_id: data.user_id,
                        //   title: data.title,
                        //   content:data.content,
                        //   image:data.image,
                        //   wdate: data.wdate,
                        //   like_cnt: data.like_cnt,
                        //   hit: data.hit,
                        //   user_seq: data.user_seq,
                        // });
                    })

                    setFreeboardList((prevState)=>[...prevState, ...res.data.list])
                }
              );
        //console.log( heroState.hero );
      }, []);

    return (


        <div className="feed">
            {/* <StoryReel />
            <MessageSender /> */}
            {freeboardList.map(()=> 
                <Post
                    free_seq={free_seq}
                    user_id={user_id}
                    title= {title}
                    content={content}
                    image={image}
                    wdate={wdate}
                    like_cnt={like_cnt}
                    hit={hit}
                    user_seq={user_seq}
                />)
            }
           
            
        </div>
    )
}

export default Feed
