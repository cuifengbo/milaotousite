
 
import { fetchBlog } from '../../../lib/actions';
import { fetchproject } from '../../../lib/data';
 

export default async function Edit(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const project = await fetchproject(id);

    return (
        <div className="container mx-auto">
            <div className='h-28'></div>
                <div className='flex-grow p-4'>
                    <h1>{project.title}</h1>
                    {/* 时间 update_time */}
                    <p>{new Date(project.update_time).toLocaleString()}</p>
                    <div dangerouslySetInnerHTML={{ __html: project.content }} />
                </div>
        </div>
    );
}