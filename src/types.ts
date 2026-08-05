export interface EnrollmentData {
  id?: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  childName: string;
  childGrade: string;
  subject: string;
  subjects?: string[];
  format: "In Person" | "Online" | "Hybrid";
  preferredTime: string;
  assessmentDate?: string;
  assessmentTime?: string;
  notes?: string;
  status?:
    | "Pending"
    | "Contacted"
    | "Scheduled"
    | "Completed"
    | "Cancelled"
    | "Approved"
    | "Enrolled"
    | "Archived";
  createdAt?: string;
  confirmationCode?: string;
}

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface SubjectItem {
  id: string;
  title: string;
  category: string;
  iconName: string;
  badge: string;
  description: string;
  keyTopics: string[];
  colorTheme: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
  };
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  iconName: string;
}

export interface FormatItem {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  features: string[];
  bestFor: string;
}
