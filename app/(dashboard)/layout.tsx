

import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  
    return (
        <div className="h-full relative">
            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                <Navbar />
            </div>
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-[50]">
                <Sidebar />
            </div>
            <div className="md:pl-56 pt-[80px] h-full">
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;




// import { auth } from "@clerk/nextjs/server";
// import { Navbar } from "./_components/navbar";
// import { Sidebar } from "./_components/sidebar";
// import axios from "axios";

// const DashboardLayout = ({children}: {children: React.ReactNode}) => {
//     const {userId} =  auth();

//     if (userId) {
//         // Make a POST request to store the user data using Axios
//         axios.post("/api/store-user", { 
//           userId,
//         })
//         .then((response) => {
//           console.log("User saved:", response.data);
//         })
//         .catch((error) => {
//           console.error("Error saving user:", error);
//         });
//       }

//     return ( <div className="h-full relative">
//         <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
//             <Navbar/>
//         </div>
//         <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-[50]">
//             <Sidebar/>
//         </div>
//         <div className="md:pl-56 pt-[80px] h-full "> 
//         {children}
//         </div>
//     </div> );
// }
 
// export default DashboardLayout;