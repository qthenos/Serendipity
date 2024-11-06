"use client"

import { 
    useSessionContext,
    useSupabaseClient 
} from "@supabase/auth-helpers-react";

import { useRouter } from "next/navigation";



const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    return (  
        <div>hello</div>
    );
}
 
export default AuthModal;