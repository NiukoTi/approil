import { NextResponse } from "next/server";
import db from "@lib/db"

export async function GET(req) {
  const inventory = await db.inventory.findMany({
    include: {
      product: true,
      warehouse: true,
    }
  });
  return NextResponse.json(inventory, { status: 200 });
}
