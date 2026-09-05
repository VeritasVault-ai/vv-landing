import { NextResponse } from "next/server"

export function retiredAuthResponse() {
  return NextResponse.json(
    {
      error: "authentication_unavailable",
      message: "This legacy authentication endpoint has been retired.",
    },
    {
      status: 410,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  )
}
