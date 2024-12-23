'use client'

import QuillEditor from '../../ui/quill';
import { use, useState,useEffect } from 'react';
import { writeProject } from '../../lib/actions';
import { uploadFileAsBase64 } from '../../utils/upload';

export default  function Addblog(  ){

    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [pic_url, setPic_url] = useState('');
    const titlechange = (e: any) => {
        setTitle(e.target.value);
    }
    const contentchange = (e: any) => {
        console.log("content:",e);
        setContent(e);
    }
    
    useEffect(() => {
        document.getElementById('imageInput').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                console.log('file:',file);
                uploadFileAsBase64(file).then((location:any) => {
                    if (location) {
                        console.log('res:', location);
                        const url = location;
                        setPic_url(url);
                    } else {
                        console.error('Failed to get image URL after upload.');
                    }
                });
            }
          });
    },[]);

    const send = () => {
        console.log('send');
        console.log(content);
        console.log(title);
        console.log(pic_url);
       
        if (content === '' || title === '') {
            alert('标题和内容不能为空');
            return;
        }
        writeProject(title, content, pic_url).then(() => {
            
            window.location.href = '/project';
        }).catch((e) => {
            alert('发布失败');
        });
    }
   
    return (
        <div className="container mx-auto">
            <div className='h-28'></div>
            <input onChange={titlechange} className="w-full h-10 border border-gray-300 rounded px-3 mb-3 bg-black" placeholder="标题" />
            <p className='mb-3'> 上传标题图 <input type="file" id="imageInput" accept="image/*"  /></p>       
               
           
            <QuillEditor onUpdate={contentchange}/>
            <div className="flex justify-end mt-3">
                <button onClick={send} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    发 布
                </button>
            </div>
        </div>
    );
}