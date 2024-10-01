import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface User extends JwtPayload {
  username: string;
  role: string;
}

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
    const user = verify(value, secret) as User;
    const { username, role } = user;
    const response = {
      username,
      role,
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
