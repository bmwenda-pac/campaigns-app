import { lucia } from "@/lib/lucia";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    console.log("");
    console.log("######################################");
    console.log("#                                    #");
    console.log("# Running scheduler @ 8:00AM EAT #");
    console.log("#                                    #");
    console.log("######################################");
    console.log("");
    await lucia.deleteExpiredSessions();
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
