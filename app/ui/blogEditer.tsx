'use client'

import QuillEditor from './quill';
import { use, useState,useEffect } from 'react';
import { updateBlog, fetchBlog } from '../lib/actions';
 
export default function Editblog(props: { id: string ,title:string,content:string}) {
    const id = props.id; 
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    console.log('props:',props.content);
    useEffect(() => {
        setTitle(props.title);
    }, []);
   
    // setContent(props.content);
    const titlechange = (e: any) => {
        console.log('title:', e.target.value);
        setTitle(e.target.value);
    }
    const contentchange = (e: any) => {
        console.log("content:", e);
        setContent(e);
    }
    const send = () => {
        console.log('send');
        console.log(content);
        console.log(title);
        return;
        if (content === '' || title === '') {
            alert('标题和内容不能为空');
            return;
        }
        updateBlog(id, title, content).then(() => {
            window.location.href = '/blog';
        }).catch((e) => {
            alert('发布失败');
        });
    }

    return (
        <div className="container mx-auto">
            <div className='h-28'></div>
            <input onChange={titlechange} className="w-full h-10 border border-gray-300 rounded px-3 mb-3 bg-black" defaultValue={props.title} />
            <QuillEditor onUpdate={contentchange} defaultValue={props.content} />
            <div className="flex justify-end mt-3">
                <button onClick={send} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    发 布
                </button>
            </div>
        </div>
    );
}