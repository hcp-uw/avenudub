import { createContext, ReactNode, useState } from "react";

// interface User {
//     username: string | null;
//     email: string | null;
//     loggedIn: boolean;
// }

const UserContext = createContext({
    user: { username: "", email: "", userId: 0, favorites: [], loggedIn: false },
    setUser: (user: { username: string; email: string; userId: number, favorites: [], loggedIn: boolean }) => {}
  });
  


export default UserContext;