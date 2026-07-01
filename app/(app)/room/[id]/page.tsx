export default async function RoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="animate-fade-up max-w-2xl mx-auto">
      <div className="bento-box rounded-[24px] bg-parchment p-8 text-center">
        <h1 className="font-gaegu text-2xl font-bold text-ink mb-2">Room #{id}</h1>
        <p className="font-nunito text-sm font-semibold text-ink/60">
          The live room view is coming soon — this is a placeholder page.
        </p>
      </div>
    </div>
  );
}
