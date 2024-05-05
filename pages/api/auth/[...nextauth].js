import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { wpAuth } from '@/services/wp-auth';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      async authorize(credentials) {
        // console.log('credentials:server', credentials);
        return await wpAuth(credentials);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7,
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
