import { NextResponse } from "next/server";
import { z } from "zod";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const users: User[] = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com", role: "admin" },
  { id: 2, name: "Alan Turing", email: "alan@example.com", role: "engineer" },
  { id: 3, name: "Grace Hopper", email: "grace@example.com", role: "engineer" },
  { id: 4, name: "Linus Torvalds", email: "linus@example.com", role: "engineer" },
  { id: 5, name: "Margaret Hamilton", email: "margaret@example.com", role: "manager" },
];

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
