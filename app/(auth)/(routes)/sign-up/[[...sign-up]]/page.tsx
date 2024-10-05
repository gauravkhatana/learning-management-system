"use client";

import { SignUp } from "@clerk/nextjs";
// import { User } from "@prisma/client";

// Assuming User from Clerk's user structure
interface ClerkUser {
  id: string;
  emailAddresses: { emailAddress: string }[];
}

export default function Page() {
  return (
    <SignUp/>
  );
}

// "use client";
// // pages/signup.js
// import { useState } from 'react';
// import { useSignUp } from '@clerk/nextjs';
// import { useRouter } from 'next/router';

// export default function CustomSignUpPage() {
//   const { isLoaded, signUp } = useSignUp();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   const handleSubmit = async (e:any) => {
//     e.preventDefault();

//     if (!isLoaded) return;

//     try {
//       // Perform Clerk sign-up process
//       const result = await signUp.create({
//         emailAddress: email,
//         password,
//       });

//       // Prepare email verification if needed
//       await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

//       // Call your backend API to save the user in your database
//       await fetch('/api/store-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           clerkUserId: result.id,
//           email: email,
//         }),
//       });

//       // Optionally redirect to another page
//       router.push('/');
//     } catch (err) {
//       console.log(err);
//       // setError(err.errors[0]?.message || 'Error signing up');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {error && <div className="text-red-500">{error}</div>}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
//               required
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md"
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { SignUp, useUser } from "@clerk/nextjs";
// import { useEffect } from "react";
// import axios from "axios"; // Import Axios

// export default function SignUpPage() {
//   const { user } = useUser();

//   useEffect(() => {
//     if (user) {
//       // Make a POST request to store the user data using Axios
//       axios.post("/api/store-user", {
//         userId: user.id,
//         email: user.emailAddresses[0].emailAddress,
//         firstName: user.firstName,
//         lastName: user.lastName,
//       })
//       .then((response) => {
//         console.log("User saved:", response.data);
//       })
//       .catch((error) => {
//         console.error("Error saving user:", error);
//       });
//     }
//   }, [user]);

//   return (
//     <div>
//       <SignUp />
//       {user && (
//         <div>
//           <p>Welcome, {user.firstName || "User"}!</p>
//           <p>Your User ID is: {user.id}</p>
//         </div>
//       )}
//     </div>
//   );
// }
