import Link from "next/link";
import { fetchBlogs } from "../lib/data";
import { fetchBlog } from "../lib/actions";
import Delbutton from '../ui/delbutton';
import Bloglist from "../ui/bloglist";

export default async function Blog() {
    const blogs = await fetchBlogs();
    const currentBlog = await fetchBlog(blogs[0].id);
    
    return (
        <div className="container mx-auto">
            <div className='h-28'></div>
            <div className="flex ">
                <div className="w-64 p-4 border-r-0.5 border-slate-500 ">
                    <Bloglist blogs={blogs} />
                </div>
                <div className='flex-grow p-4'>
                    <h1>{currentBlog.title}</h1>
                    {/* 时间 update_time */}
                    <p>{new Date(currentBlog.update_time).toLocaleString()}</p>
                    <div dangerouslySetInnerHTML={{ __html: currentBlog.content }} />

                </div>
            </div>
        </div>
    );
}