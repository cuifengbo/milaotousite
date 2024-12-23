"use client"

import React, { useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // 导入 Quill 样式
import { useEffect } from 'react';
import { uploadFileAsBase64 } from '../utils/upload';


const QuillEditor = ({onUpdate,defaultValue}:any) => {
    console.log('defaultValue:',defaultValue);
     
    useEffect(() => {
        const options = {
            placeholder: 'Hello, World!',
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    ['link', 'image'],
                    ['clean']
                ],
            },

        };
        const quill = new Quill('#editor', options);
        // 检查内容变化
        quill.on('text-change', () => {
            const content = quill.root.innerHTML;
            onUpdate(content)
        });
        console.log('defaultValue:',defaultValue);
        if(defaultValue){
            quill.root.innerHTML = defaultValue;
        }
        
        const toolbar = quill.getModule('toolbar');
        const imgHandler = () => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();
            input.onchange = async () => {
                const file = input.files[0];
                uploadFileAsBase64(file).then((location) => {
                    if (location) {
                        console.log('res:', location);
                        const url = location;
                        const range = quill.getSelection();
                        if (range !== null) { // 确保有选区
                            quill.insertEmbed(range.index, 'image', url);
                        }
                    } else {
                        console.error('Failed to get image URL after upload.');
                    }
                });
            };
        };
        toolbar.addHandler('image', imgHandler);
    }, []);

    return (
        <div>
            <div id="editor">
            </div>
        </div>
    );
};

// Quill 模块配置
QuillEditor.modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

// Quill 格式化配置
QuillEditor.formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

export default QuillEditor;