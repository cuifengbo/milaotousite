"use client"

import Image from "next/image";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: '关于', href: '/', icon: HomeIcon },
  {
    name: '项目',
    href: '/project',
    icon: DocumentDuplicateIcon,
  },
  { name: '博客', href: '/blog', icon: UserGroupIcon },
  { name: '常用链接', href: '/usefulthings', icon: UserGroupIcon },
  { name: '联系', href: '/contact', icon: UserGroupIcon },
];

export default function Topnav() {
  const pathname = usePathname();
  return (
    <div className="
      grid   grid-cols-5 ga
      p-3 mx-auto mt-2 
      fixed left-1/2 transform -translate-x-1/2
      max-w-screen-md	 w-full
      border-0.5 border-slate-500 rounded-md
      font-[family-name:var(--font-geist-sans)]
    ">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex gap-4 h-9 items-center cursor-pointer border-slate-500 rounded-md pl-3 bg-custom-gradient mx-1.5 my-0.5',
              {
                'border-0.5': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
          
        );
      })}

    </div>
  );
}