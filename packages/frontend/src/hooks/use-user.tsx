import { User } from "@supabase/auth-helpers-nextjs";
import { UserDetails } from "../../types";
import { createContext, useContext, useEffect, useState } from "react";
import { 
    useSessionContext, 
    useUser as useSupaUser 
} from "@supabase/auth-helpers-react";

type userContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading : boolean;
}

export const UserContext = createContext<userContextType | undefined>(
    undefined
);

export interface Props {
    [propName: string] : never;
};

export const MyUserContextProvider = (props: Props) => {
    const {
        session, 
        isLoading: isLoadingUser, 
        supabaseClient: supabase
    } = useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    const getUserDetails = () => supabase.from('Users').select('*').single();
    
    useEffect(() => {
        if (user && !isLoadingData && !userDetails) {
            setIsLoadingData(true);
        

            Promise.allSettled([getUserDetails()]).then(
                (results) => {
                    const userDetailsPromise = results[0];

                    if (userDetailsPromise.status === "fulfilled"){
                        setUserDetails(userDetailsPromise.value.data as UserDetails);
                    }

                    setIsLoadingData(false);
                }
            );
        } else if (!user && !isLoadingUser && !isLoadingData) {
            setUserDetails(null);
        }
    }, [user, isLoadingUser]);

    const value = {
        accessToken, 
        user, 
        userDetails, 
        isLoading: isLoadingUser || isLoadingData
    };

    return <UserContext.Provider value={value} {...props}/>
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('userUser must be used within a MyUserContextProvider');
    }
    return context;
};