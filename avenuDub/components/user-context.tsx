import { createContext, ReactNode, useState } from "react";

// interface User {
//     username: string | null;
//     email: string | null;
//     loggedIn: boolean;
// }

const UserContext = createContext({
    user: { username: "", email: "", loggedIn: false },
    setUser: (user: { username: string; email: string; loggedIn: boolean }) => {}
  });
  


export default UserContext;