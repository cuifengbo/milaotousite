'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { signIn } from '../../auth';
import { AuthError } from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}
export const writeBlog = async (title: string, content: string): Promise<void> => {
    await sql`
        INSERT INTO blogs (title, content)
        VALUES (${title}, ${content})
    `;
    revalidatePath('/blog');
};
export const updateBlog = async (id: number, title: string, content: string): Promise<void> => {
    await sql`
      UPDATE blogs
        SET title = ${title}, 
            content = ${content},
            update_time = NOW()
        WHERE id = ${id}
    `;
    revalidatePath('/blog');
}

export const deleteBlog = async (id: number): Promise<void> => {
    await sql`
        DELETE FROM blogs
        WHERE id = ${id}
    `;
    revalidatePath('/blog');
}

export const fetchBlog = async (id: any): Promise<any[]> => {
    const data = await sql`
        SELECT * FROM blogs
        WHERE id = ${id}
    `;
    return data.rows[0];
}

//project
export const writeProject = async (title: string, content: string, pic_url: string): Promise<void> => {
    await sql`
        INSERT INTO projects (title, content, pic_url)
        VALUES (${title}, ${content}, ${pic_url})
    `;
    revalidatePath('/blog');
};
export const updateProject = async (id: number, title: string, content: string, pic_url: string): Promise<void> => {
    await sql`
      UPDATE projects
        SET title = ${title}, 
            content = ${content},
            pic_url = ${pic_url},
            update_time = NOW()
        WHERE id = ${id}
    `;
    revalidatePath('/project');
}
