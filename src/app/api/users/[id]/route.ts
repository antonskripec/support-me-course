import { NextResponse } from "next/server";
import { z } from "zod";
import { users } from "../data";

const updateUserSchema = z
  .object({
    name: z.string().min(1),
    email: z.email(),
    role: z.string().min(1),
  })
  .partial();

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const userId = Number(id);

  if (!Number.isInteger(userId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const userId = Number(id);

  if (!Number.isInteger(userId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const body = await request.json();
  const parsed = updateUserSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  Object.assign(user, parsed.data);
  return NextResponse.json(user);
}

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
