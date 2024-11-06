"use client";

import { MyUserContextProvider } from "../../src/hooks/use-user";

interface UserProviderProps {
    children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
    return (
        <MyUserContextProvider>
            {children}
        </MyUserContextProvider>
    );
};

export default UserProvider;