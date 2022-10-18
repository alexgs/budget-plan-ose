/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import * as env from 'env-var';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import prisma from '../../../server-lib/prismadb';

// TODO GitHub provider doesn't pull in my email address; maybe needs a scope or something? :shrug:

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    error: '/auth/error',
    signIn: '/auth/login',
    signOut: '/auth/logout',
  },
  providers: [
    GithubProvider({
      clientId: env.get('GITHUB_ID').required().asString(),
      clientSecret: env.get('GITHUB_SECRET').required().asString(),
    }),
  ],
};

export default NextAuth(authOptions);
