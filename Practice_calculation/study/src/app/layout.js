import "./globals.css";
import OperationProvider from "./OperationProvider";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet"></link>
      </head>
      <body>
        <div className="pr-8 border-b border-gray-200 w-94 h-16">
            <div className="flex justify-between items-center">
              <img src="/logo_header.png" alt="logo" className="w-16 h-14" />
              <div className=" w-8 h-8 text-blue-500 flex justify-center items-center">
                <i className="fa fa-bars" aria-hidden="true"></i>
              </div>
            </div>
        </div>
        <OperationProvider>
            {children}
        </OperationProvider>
      </body>
    </html>
  );
}
