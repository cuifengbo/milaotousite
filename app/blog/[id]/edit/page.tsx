
import Editblog from '../../../ui/blogEditer';
import { fetchBlog } from '../../../lib/actions';

export default async function Edit(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const blog = await fetchBlog(id);

    return (
        <div className="container mx-auto">
            
            <Editblog id={id} title={blog.title} content={blog.content}></Editblog>
           
        </div>
    );
}