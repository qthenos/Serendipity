// app/dashboard/login/layout.tsx
export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="login-layout">
            <main>{children}</main>
        </div>
    );
}
