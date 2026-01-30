import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      userType: string;
      image?: string;
      provider?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    userType: string;
    image?: string;
    provider?: string;
    googleId?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    userType: string;
    image?: string;
    provider?: string;
  }
}
