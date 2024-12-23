function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); // 读取文件并编码为 Data URL

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                // Data URL 的格式是 "data:[<mediatype>][;base64],<data>"
                // 我们只需要逗号后面的 base64 编码部分
                const base64Content = reader.result.split(',')[1];
                resolve(base64Content);
            } else {
                reject(new Error('Failed to read the file as data URL.'));
            }
        };

        reader.onerror = (error) => {
            reject(error);
        };
    });
}
export async function uploadFileAsBase64(file: File) {
    try {
        // 将文件转换为 Base64 编码的字符串
        const base64Content = await fileToBase64(file);

        // 创建包含 Base64 内容的 JSON 请求体
        const requestBody = JSON.stringify({ base64Content, filename: file.name });

        // 发送 POST 请求
        const response = await fetch('/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // 设置适当的 Content-Type 头
            },
            body: requestBody, // 使用 JSON 字符串作为请求体
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Upload success:', result);
        return result.location; // 返回上传后的图片 URL
    } catch (error) {
        console.error('Upload failed:', error);
    }
}