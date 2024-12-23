import type { NextAuthConfig } from 'next-auth';


export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
     
      const isLoggedIn = !!auth?.user;
      const isOnblogAdd = nextUrl.pathname.startsWith('/blog/addblog');
      const isEditingProject = nextUrl.pathname.startsWith('/project') && nextUrl.pathname.endsWith('/edit');
      console.log('isLoggedIn:', isLoggedIn);
      if (isLoggedIn) {
        // 如果用户已登录且不在登录页面，则重定向到博客页面
        return true;
      }
      if ((isOnblogAdd || isEditingProject ) && !isLoggedIn) {
        // 如果用户未登录且在写博客页面，则重定向到登录页面
        return Response.redirect(new URL('/login', nextUrl));
      }

      // // 如果未登录且不在登录页面，则重定向到登录页面
      // if (!isOnLogin) {
      //   return Response.redirect(new URL('/login', nextUrl));
      // }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
