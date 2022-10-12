import * as env from 'env-var';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: env.get('GITHUB_ID').required().asString(),
      clientSecret: env.get('GITHUB_SECRET').required().asString(),
    }),
  ],
};

export default NextAuth(authOptions);
