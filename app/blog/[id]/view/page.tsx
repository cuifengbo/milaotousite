
import Editblog from '../../../ui/blogEditer';
import { fetchBlog } from '../../../lib/actions';
import { fetchBlogs } from '../../../lib/data';
import Bloglist from '../../../ui/bloglist';

export default async function Edit(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const blog = await fetchBlog(id);
    const blogs = await fetchBlogs();

    return (
        <div className="container mx-auto">
            <div className='h-28'></div>
            <div className="flex ">
                <div className="w-64 p-4 border-r-0.5 border-slate-500 ">
                    <Bloglist blogs={blogs} />
                </div>
                <div className='flex-grow p-4'>
                    <h1>{blog.title}</h1>
                    {/* 时间 update_time */}
                    <p>{new Date(blog.update_time).toLocaleString()}</p>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />

                </div>
            </div>
        </div>
    );
}