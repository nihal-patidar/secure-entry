import '@/app/ui/global.css';
import { inter } from './ui/fonts';
import { UserContextProvider } from './context/UserContext';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <UserContextProvider>
          <body className={`${inter.className} antialiased w-full bg-white h-full`}>
            <div className='w-full h-full'>{children}</div>
            {/* <div className='text-4xl hidden sm:block w-fit mx-auto text-gray-600'>Only For SmartPhones</div> */}
            </body>
        </UserContextProvider>
    </html>
  );
}
