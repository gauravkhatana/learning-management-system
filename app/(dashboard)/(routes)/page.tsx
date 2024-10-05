"use Client";

import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
// import { useEffect } from "react";

export default function Home() {
  const { userId } = auth();


    if (userId) {
      // Make a POST request to store the user data using Axios
      axios.post("http://localhost:3000/api/store-user", { 
        userId,
      })
      .then((response) => {
        console.log("User saved:", response.data);
      })
      .catch((error) => {
        console.error("Error saving user:", error);
      });
    }



  return (
    <div className="p-6">
 Dashboard page
    </div>
    
  );
}
