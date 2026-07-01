export const ONBOARDING_STORAGE_KEY = "bubble-onboarding";

export type GradeLevel = "Middle School" | "High School" | "College" | "Other";
export type StudyStyle = "Visual" | "Reading" | "Practice problems" | "Mixed";
export type Struggle = "Distraction" | "Procrastination" | "Memory" | "Time management";

export interface OnboardingData {
  gradeLevel: GradeLevel | null;
  subjects: string[];
  studyStyle: StudyStyle | null;
  struggle: Struggle | null;
  hoursPerDay: number;
  tools: {
    googleCalendar: boolean;
    notion: boolean;
  };
  completed: boolean;
  completedAt: string | null;
}

export const defaultOnboardingData: OnboardingData = {
  gradeLevel: null,
  subjects: [],
  studyStyle: null,
  struggle: null,
  hoursPerDay: 2,
  tools: { googleCalendar: false, notion: false },
  completed: false,
  completedAt: null,
};

export function loadOnboardingData(): OnboardingData {
  if (typeof window === "undefined") return defaultOnboardingData;
  try {
    const raw = window.localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!raw) return defaultOnboardingData;
    return { ...defaultOnboardingData, ...JSON.parse(raw) } as OnboardingData;
  } catch {
    return defaultOnboardingData;
  }
}

export function saveOnboardingData(data: OnboardingData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(data));
}

export function isOnboardingComplete(): boolean {
  if (typeof window === "undefined") return true;
  return loadOnboardingData().completed === true;
}
