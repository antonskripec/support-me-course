export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export const users: User[] = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com", role: "admin" },
  { id: 2, name: "Alan Turing", email: "alan@example.com", role: "engineer" },
  { id: 3, name: "Grace Hopper", email: "grace@example.com", role: "engineer" },
  { id: 4, name: "Linus Torvalds", email: "linus@example.com", role: "engineer" },
  { id: 5, name: "Margaret Hamilton", email: "margaret@example.com", role: "manager" },
];
