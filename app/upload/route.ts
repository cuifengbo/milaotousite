
import { Octokit } from '@octokit/rest';
import Busboy from 'busboy';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

import { type NextRequest } from 'next/server'
import { type NextResponse } from 'next/server'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });


export const config = {
    api: {
        bodyParser: true, // 启用默认 body parser 以解析 JSON
    },
};

 
export async function POST(request: Request) {
    const res = await request.json()
    // 获取传进来的参数
    console.log(res);
    const { base64Content, filename } = res;
    console.log(base64Content)
    console.log(filename)
    //取filename的后缀  
    const ext = filename.split('.').pop();

    const filePath = `upload/${Date.now()}.${ext}`;
    const content = base64Content;

    await octokit.repos.createOrUpdateFileContents({
        owner: process.env.OWNER,
        repo: process.env.REPO,
        path: filePath,
        message: 'Add sample image',
        content,
        branch: 'main', // 如果不是 main 分支，请更改这里
    });
   
    const htmlUrl = `https://raw.githubusercontent.com/${process.env.OWNER}/${process.env.REPO}/refs/heads/main/${filePath}`;
    console.log(htmlUrl);
    
    return Response.json({
        location:htmlUrl,
    });

}