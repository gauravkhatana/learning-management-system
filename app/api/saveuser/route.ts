
import { db } from "@/lib/db";

import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const body = await req.json();
  const { userId } = body;

  // Get the user details from Clerk
  console.log('INSIDE STORE USER API',userId);
  const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      contentType: "application/json",
    },
  }).then((res) => res.json());
  // console.log('USER FROM CLERK GET API :::::::::',user);

  // Store user details in the database
  try {
    const savedUser = await db.users.upsert({
      where: { userId },
        create: {
          userId,
          email: user.email_addresses[0]?.email_address || "",
          firstName: user.first_name || "null",
          lastName: user.last_name || "null",
        },
        update: {
          email: user.email_addresses[0]?.email_address || "",
          firstName: user.first_name || "null",
          lastName: user.last_name || "null",
        },
    });

    // console.log('SAVED USER ::::::',savedUser);

    return new NextResponse(JSON.stringify(savedUser), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Error saving user to database." }),
      { status: 500 }
    );
  }
}
