import TopNav from "../components/TopNav";
import { SessionProvider } from "../store/SessionContext";
import FloatingBuddy from "../components/FloatingBuddy";
import OnboardingGate from "../components/OnboardingGate";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <OnboardingGate>
        <TopNav />
        <main className="max-w-6xl mx-auto px-6 pt-6 pb-12">
          {children}
        </main>
        <FloatingBuddy />
      </OnboardingGate>
    </SessionProvider>
  );
}
