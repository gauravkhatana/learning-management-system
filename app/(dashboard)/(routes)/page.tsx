"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
// import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { useEffect } from "react";
// import { useEffect } from "react";

export default function Home() {
  const { userId, isLoaded } = useAuth();

  console.log(
    "USER ID FROM HOME PAGE::::::::::::::::::::::::::::::::::::::",
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

  return <div className="p-6">Dashboard page</div>;
}
