import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      name: string;
      email: string;
      phone: string;
      isAdmin: boolean;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    phone: string;
    isAdmin: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    phone: string;
    isAdmin: boolean;
  }
}
