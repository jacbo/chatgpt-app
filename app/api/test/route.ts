import { NextRequest,NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.url
  let rs =  NextResponse.json({url})
  console.log('------------------------')
  console.log(rs)
  return rs
}