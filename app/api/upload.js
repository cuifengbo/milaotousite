// pages/api/upload.js
import { Octokit } from '@octokit/rest';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
console.log('GITHUB_TOKEN:', process.env.GITHUB_TOKEN);
export const config = {
  api: {
    bodyParser: false, // 使用自定义 body parser (multer)
  },
};

const upload = multer({ storage: multer.memoryStorage() });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return new Promise((resolve, reject) => {
      upload.single('file')(req, res, async (err) => {
        console.log('req.file:', req.file);
        if (err) {
          return res.status(400).json({ error: err.message });
        }

        const { file } = req;
        if (!file) {
          return res.status(400).json({ error: 'No file uploaded.' });
        }

        try {
          const filePath = `images/${Date.now()}-${file.originalname}`;
          const content = Buffer.from(file.buffer).toString('base64');

          await octokit.repos.createOrUpdateFileContents({
            owner: process.env.OWNER,
            repo: process.env.REPO,
            path: filePath,
            message: 'Add sample image',
            content,
            branch: 'main', // 如果不是 main 分支，请更改这里
          });

          const htmlUrl = `https://raw.githubusercontent.com/${process.env.OWNER}/${process.env.REPO}/main/${filePath}`;
          res.json({ location: htmlUrl });
        } catch (error) {
          console.error('Error uploading file:', error);
          res.status(500).json({ error: 'Failed to upload image to GitHub.' });
        } finally {
          resolve();
        }
      });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}