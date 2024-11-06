import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
        console.error("Error fetching session:", error);
        return NextResponse.rewrite(new URL('/login', req.url));
    }

    console.log(session);
    if (!session) {
        return NextResponse.rewrite(new URL('/signup', req.url));
    }
    return res;
}

export const config = {
    matcher: [
        '/', // Ensure the home page is included
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}