import Link from "next/link";
import Delbutton from './delbutton';
import { auth, signOut } from '../../auth';

export default async function Bloglist({ blogs }: any) {
    const user = await auth();
    const isLogin = user !== null;
    return (
    <div>
        {isLogin && (<Link href="/blog/addblog">写博客</Link>)}
        {blogs.map((blog: any) => (
            <div className="mb-6" key={blog.id}>
                <Link href={`/blog/${blog.id}/view`}>{blog.title}</Link>
                {/* 时间 update_time */}
                <p className="text-sm ">{new Date(blog.update_time).toLocaleString()}</p>
                {/* <div dangerouslySetInnerHTML={{ __html: blog.content }} /> */}
                {isLogin && (
                <div className="flex gap-2">
                    <Delbutton id={blog.id}></Delbutton>
                    <Link href={`/blog/${blog.id}/edit`}>编辑</Link>
                </div>)}
            </div>
        ))}
        </div>
    )
}