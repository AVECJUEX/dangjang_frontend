import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { PlusOutlined } from '@ant-design/icons'

function FileUpload({setfileList, setImageSrc, setImageSrcList, imageSrcList}){ 

    const dropHandler = (files)=>{

      console.log("-----------------",files);

      setfileList(files);

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