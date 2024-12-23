
import Editproject from '../../../ui/projectEditer';
import { fetchproject } from '../../../lib/data';

export default async function Edit(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const project = await fetchproject(id);

    return (
        <div className="container mx-auto">
           
             <Editproject id={id} title={project.title} content={project.content} pic_url={project.pic_url}></Editproject>  
           
        </div>
    );
}