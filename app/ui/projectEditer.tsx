'use client'

import QuillEditor from './quill';
import { use, useState, useEffect } from 'react';
import { updateProject } from '../lib/actions';
import { uploadFileAsBase64 } from '../utils/upload';

export default function Editproject(props: { id: string, title: string, content: string, pic_url: string }) {
    const id = props.id;
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [pic_url, setPic_url] = useState('');
    console.log('props:', props.content);
    useEffect(() => {
        setTitle(props.title);
        setPic_url(props.pic_url);

        document.getElementById('imageInput').addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                uploadFileAsBase64(file).then((location: any) => {
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
        console.log(pic_url);
         
        if (content === '' || title === '') {
            alert('标题和内容不能为空');
            return;
        }
        updateProject(id, title, content,pic_url).then(() => {
            window.location.href = '/project';
        }).catch((e) => {
            alert('发布失败');
        });
    }
    const del = () => {
        console.log('del');
        if (confirm('确定删除吗？')) {
            window.location.href = '/project';
        }
    }

    return (
        <div className="container mx-auto">
            <div className='h-28'></div>
            <input onChange={titlechange} className="w-full h-10 border border-gray-300 rounded px-3 mb-3 bg-black" defaultValue={props.title} />
            <p className='mb-3'> 上传标题图 <input type="file" id="imageInput" accept="image/*"  /></p>       
            <QuillEditor onUpdate={contentchange} defaultValue={props.content} />
            <div className="flex justify-end mt-3">
                <button onClick={send} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    发 布
                </button>
                <button onClick={del} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    删除
                </button>
            </div>
        </div>
    );
}