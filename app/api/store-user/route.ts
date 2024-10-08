"use client";

// pages/api/storeUser.js
import { db } from "@/lib/db";
import axios from "axios";
// import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Error from "next/error";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "UserId is required." }),
        { status: 400 }
      );
    }

    // Fetch user details from Clerk using axios
    console.log('INSIDE STORE USER API', userId);

    const userResponse = await axios.get(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json', // Corrected header casing
      },
    });

    const userData = userResponse.data;
    console.log('USER FROM CLERK API :::::::::', userData);

    // Store user details in the database
    const savedUser = await db.user.create({
      data: {
        id: userData.id,
        email: userData.email_addresses[0]?.email_address || null,
        firstName: userData.first_name || null,
        lastName: userData.last_name || null,
        password: "root", // Ensure password_hash is available from Clerk
      },
    });

    console.log('SAVED USER ::::::', savedUser);

    // Return the stored user
    return new NextResponse(JSON.stringify(savedUser), { status: 200 });

  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error from Clerk API:', error.response.data);
      return new NextResponse(
        JSON.stringify({ error: `Failed to fetch user: ${error.response.data}` }),
        { status: error.response.status }
      );
    } else {
      console.error('Error storing user:', error instanceof Error ? error.toString() : 'Unknown error');
      return new NextResponse(
        JSON.stringify({ error: "Error saving user to database." }),
        { status: 500 }
      );
    }
  }
}


// // pages/api/storeUser.js
// import { db } from "@/lib/db";

// import { getAuth } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   // const { userId } = getAuth(req);

//   const body = await req.json();
//   const { userId } = body;

//   // Get the user details from Clerk
//   console.log('INSIDE STORE USER API',userId);
//   const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
//     headers: {
//       Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
//       contentType: "application/json",
//     },
//   }).then((res) => res.json());
//   console.log('USER FROM CLERK GET API :::::::::',user);

//   // Store user details in the database
//   try {
//     const savedUser = await db.user.create({
//       data: {
//         id: user.id, // Use the actual id from the Clerk API response
//         email: user.email_addresses[0]?.email_address || null, // Handle email extraction safely
//         firstName: user.first_name || null,
//         lastName: user.last_name || null,
//         password: user.password_hash || null,
//       },
//     });

//     console.log('SAVED USER ::::::',savedUser);

//     return new NextResponse(JSON.stringify(savedUser), { status: 200 });
//   } catch (error) {
//     return new NextResponse(
//       JSON.stringify({ error: "Error saving user to database." }),
//       { status: 500 }
//     );
//   }
// }
