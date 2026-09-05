import type { NextRequest } from "next/server"
import { SmartApiController } from "@/lib/api/smart-api-controller"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return SmartApiController.checkProcessStatus(req, id)
}
