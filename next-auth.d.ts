import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      isAdmin: boolean;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    id: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    isAdmin: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
  }
}
