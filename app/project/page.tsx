import Link from "next/link";
import { fetchprojects } from "../lib/data";

export default async function Project() {
    const projects = await fetchprojects();
    return (
        <div>
            <div className='h-28'><Link href="/project/addproject">Add  item</Link></div>
            <div className="container mx-auto masonry-grid">               
                {projects.map((item: any) => (
                    <div key={item.id} className="masonry-item">
                        <Link href={`/project/${item.id}/view`}>
                            <img src={item.pic_url} className="w-full h-auto"/>
                            <h1>{item.title}</h1>
                        </Link>
                        <Link href={`/project/${item.id}/edit`}>编辑</Link>
                    </div>
                ))}
                 
            </div>
        </div>

    );
}