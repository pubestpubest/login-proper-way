import { stat } from "fs";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = cookies();
  const token = cookie.get("OurSiteJWT");
  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorize",
      },
      { status: 401 }
    );
  }
  const { value } = token;
  const secret = process.env.JWT_SECRET || "";
  try {
    verify(value, secret);
    const response = {
      user: "Admin user",
    };
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "something went wrong.",
      },
      { status: 400 }
    );
  }
}
