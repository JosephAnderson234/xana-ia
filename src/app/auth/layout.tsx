"use client";
import Image from "next/image";

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const handleBack = () => {
        window.history.back();
    }

    return (
        <main className="min-h-screen flex items-center justify-center flex-col">
            <div className="ml-4 mb-4 w-full max-w-2xl">
                <button className="bg-primary text-white px-4 py-2 rounded self-start hover:cursor-pointer" onClick={handleBack}> Volver</button>
            </div>
            <div className="w-full max-w-2xl bg-background  flex flex-col justify-center items-center text-center rounded-2xl">
                <div>
                    <Image src="/logo.jpg" alt="Logo" width={150} height={150} />
                </div>
                {children}
            </div>

        </main>
    );
}