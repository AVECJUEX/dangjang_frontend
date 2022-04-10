import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { PlusOutlined } from '@ant-design/icons'
import axios from 'axios'


function FileUpload({setfileList, setImageSrc, setImageSrcList, imageSrcList}){ 

    //const [tmpList, setTmpList] = useState([]);



    
    const dropHandler = (files)=>{

      console.log("-----------------",files);

      setfileList(files);
      //encodeFileToBase64(files[0]);
      //files.map((file)=> encodeFileToBase64(file));
      //setImageSrcList(...imageSrcList, tmpList);
      

    }

    return(
        <div style={{display: 'flex', justifyContent:'space-between', float:'left'}}>
          <Dropzone onDrop={dropHandler}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div 
                style={{width: 300, height:240, border: '1px solid lightgray',
                display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <PlusOutlined style={{ fontSize:'3rem'}}/>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
    )
}

export default FileUpload;