import { createContext, ReactNode, useState } from "react";

interface User {
    username: string;
    email: string;
}

const UserContext = createContext<User | null>(null);


export default UserContext;