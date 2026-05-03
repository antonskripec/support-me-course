import { NextResponse } from "next/server";
import { users } from "../data";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const userId = Number(id);

  if (!Number.isInteger(userId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const [deleted] = users.splice(index, 1);
  return NextResponse.json(deleted);
}
