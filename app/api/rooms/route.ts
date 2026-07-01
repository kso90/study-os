export async function GET() {
  const rooms = [
    { id: 1, name: "Late Night Grind", subject: "Calculus", participantCount: 8 },
    { id: 2, name: "Bio Study Squad", subject: "Biology", participantCount: 5 },
    { id: 3, name: "Essay Crunch Session", subject: "English Lit", participantCount: 3 },
  ];

  return Response.json(rooms);
}
