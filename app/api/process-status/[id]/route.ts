import type { NextRequest } from "next/server"
import { SmartApiController } from "@/lib/api/smart-api-controller"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return SmartApiController.checkProcessStatus(req, params.id)
}
