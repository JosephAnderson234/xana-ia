import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "../components/AuthProvider";

export const metadata: Metadata = {
	title: "Xana Ia",
	description: "Tu asistente de IA para el bienestar emocional",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="bg-white">
				<AuthProvider>
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}
