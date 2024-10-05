

"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import axios from "axios"; // Import Axios if needed

export default function SignInPage() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      // If user is signed in, you can perform actions here
      console.log("User signed in:", user);
      // Optional: Make a POST request to store user data or navigate to another page
    }
  }, [user]);

  return (
    <div>
      <SignIn />
      {user && (
        <div>
          <p>Welcome back, {user.firstName || "User"}!</p>
          <p>Your User ID is: {user.id}</p>
        </div>
      )}
    </div>
  );
}



// import { SignIn } from "@clerk/nextjs";

// export default function Page() {
//   return <SignIn />;
// }