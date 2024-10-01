import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);
  const { username, password } = body;
  if (username !== "admin" || password !== "admin")
    return NextResponse.json({ message: "Unauthorize" }, { status: 401 });

  const secret = process.env.JWT_SECRET || "";
  const payload = { username, role: "admin" };
  const token = sign(payload, secret, { expiresIn: "1h" });

  const serialized = serialize("OurSiteJWT", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
    path: "/",
  });

  const response = { message: "Authenticated" };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": serialized },
  });
}
