

// "use client";

// import { SignUp, useSignUp, useAuth } from "@clerk/nextjs";
// import axios from "axios";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation"; // Import useRouter

// export default function Page() {
//   const { userId, isLoaded } = useAuth();
//   const router = useRouter(); // Initialize the router
//   const { signUp, isCreating } = useSignUp(); // Use useSignUp hook

//   console.log("USER ID FROM HOME PAGE:", userId);

//   useEffect(() => {
//     // Only proceed when userId is available and auth is fully loaded
//     if (isLoaded && userId) {
//       const saveUser = async () => {
//         try {
//           const response = await axios.post("/api/saveuser", {
//             userId: userId as string,
//           });
//           console.log("User saved:", response.data);

//           // Navigate to the dashboard after saving user
//           router.push("/dashboard"); // Adjust the path if needed
//         } catch (error) {
//           console.error("Error saving user:", error);
//         }
//       };

//       saveUser();
//     }
//   }, [userId, isLoaded, router]); // Run the effect when userId changes

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault(); // Prevent the default form submission
//     try {
//       // Manually create the sign up
//       await signUp.create(); // You may pass options if needed
//       // Handle success (like saving user data) inside the effect hook
//     } catch (error) {
//       console.error("Signup failed:", error);
//     }
//   };

//   // Render the SignUp component
//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <form onSubmit={handleSubmit}>
//         <SignUp />
//         <button type="submit" disabled={isCreating}>
//           {isCreating ? "Signing up..." : "Sign Up"}
//         </button>
//       </form>
//     </div>
//   );
// }




"use client";

import { SignUp, useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";
// import { User } from "@prisma/client";

// Assuming User from Clerk's user structure
interface ClerkUser {
  id: string;
  emailAddresses: { emailAddress: string }[];
}

export default function Page() {
  const { userId, isLoaded } = useAuth();

  console.log(
    "USER ID FROM SIGN UP PAGE ::::::::::::::::::::::::::::::::::::::",
    userId
  );

  useEffect(() => {
    // Only proceed when userId is available and auth is fully loaded
    if (isLoaded && userId) {
      const saveUser = async () => {
        try {
          const response = await axios.post("/api/saveuser", {
            userId: userId as string,
          });
          console.log("User saved:", response.data);
        } catch (error) {
          console.error("Error saving user:", error);
        }
      };

      saveUser();
    }
  }, [userId,isLoaded]); // Run the effect when userId changes

  return (
    <SignUp/>
  );
}
 