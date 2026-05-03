import { NextResponse } from "next/server";
import { z } from "zod";
import { users, type User } from "./data";

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  role: z.string().min(1),
});

export function GET() {
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = createUserSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const newUser: User = {
    id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    ...parsed.data,
  };
  users.push(newUser);

  return NextResponse.json(newUser, { status: 201 });
}
