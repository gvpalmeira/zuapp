import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full">
      {/* Left side: Image */}
      <div className="auth-asset">
          <Image 
            src="/icons/auth-image.svg"
            alt="Auth image"
            width={2049}
            height={1150}
            className="object-cover w-full h-full"
          />
      </div>
      {/* Right side: Form */}
      {children}
    </main>
  );
}
