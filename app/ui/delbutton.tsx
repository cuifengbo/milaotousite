"use client"
import { usePathname } from 'next/navigation';
import {deleteBlog} from '../lib/actions';

export default function Delbutton(props: { id: number }) {
  const pathname = usePathname();
  const { id } = props;
  return (
    <div >
        <button
            className="    "
            onClick={() => {
              confirm('确定删除吗？') &&
                deleteBlog(id);
            }}
        > 
           删除
        </button>

    </div>
  );
}