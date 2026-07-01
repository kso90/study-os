export async function GET() {
  const leaderboard = [
    { id: 1, name: "Sarah", hours: 42, streak: 7 },
    { id: 2, name: "Mike", hours: 35, streak: 4 },
    { id: 3, name: "Lisa", hours: 29, streak: 5 },
  ];

  return Response.json(leaderboard);
}
