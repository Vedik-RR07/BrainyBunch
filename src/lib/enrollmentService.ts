import type { EnrollmentData } from "../types";
import { supabase } from "./supabaseClient";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9()+\s-]{7,25}$/;

export type EnrollmentInsertPayload = Omit<EnrollmentData, "id" | "status" | "createdAt"> & {
  confirmationCode: string;
  notes?: string | null;
  assessmentDate?: string | null;
  assessmentTime?: string | null;
};

type SupabaseEnrollmentRow = {
  id: string;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  child_name: string;
  child_grade: string;
  subject: string;
  subjects: string[];
  format: string;
  preferred_time: string;
  notes: string | null;
  assessment_date: string | null;
  assessment_time: string | null;
  status: string;
  confirmation_code: string;
  created_at: string;
};

export function sanitizeText(value: string) {
  return value.trim().replace(/<[^>]*>/g, "");
}

export function normalizePhone(value: string) {
  return value.trim();
}

export function getConfirmationCode(childName: string) {
  const normalized = childName
    .trim()
    .slice(0, 3)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "") || "STU";
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `BB-${normalized}-${suffix}`;
}

export function validateEnrollmentPayload(payload: EnrollmentInsertPayload) {
  const errors: string[] = [];

  if (!payload.parentName) {
    errors.push("Parent name is required.");
  }

  if (!payload.parentEmail || !EMAIL_REGEX.test(payload.parentEmail)) {
    errors.push("A valid parent email address is required.");
  }

  if (!payload.parentPhone || !PHONE_REGEX.test(payload.parentPhone)) {
    errors.push("A valid parent phone number is required.");
  }

  if (!payload.childName) {
    errors.push("Child name is required.");
  }

  if (!payload.childGrade) {
    errors.push("Grade level is required.");
  }

  if (!payload.subjects?.length) {
    errors.push("Please select at least one subject.");
  }

  if (!payload.format) {
    errors.push("Session format preference is required.");
  }

  if (!payload.preferredTime) {
    errors.push("Preferred time window is required.");
  }

  if ((payload.assessmentDate && !payload.assessmentTime) || (!payload.assessmentDate && payload.assessmentTime)) {
    errors.push("Please select both a date and a time for your initial assessment.");
  }

  return errors;
}

export async function createEnrollment(payload: EnrollmentInsertPayload) {
  const payloadToInsert = {
    parent_name: sanitizeText(payload.parentName),
    parent_email: sanitizeText(payload.parentEmail),
    parent_phone: sanitizeText(payload.parentPhone),
    child_name: sanitizeText(payload.childName),
    child_grade: sanitizeText(payload.childGrade),
    subject: sanitizeText(payload.subject),
    subjects: payload.subjects,
    format: payload.format,
    preferred_time: sanitizeText(payload.preferredTime),
    notes: payload.notes ? sanitizeText(payload.notes) : null,
    assessment_date: payload.assessmentDate ?? null,
    assessment_time: payload.assessmentTime ?? null,
    confirmation_code: payload.confirmationCode,
  };

  const { error } = await supabase
    .from("enrollments")
    .insert([payloadToInsert]);

  if (error) {
    throw new Error(error.message);
  }

  return {
    parentName: payload.parentName,
    parentEmail: payload.parentEmail,
    parentPhone: payload.parentPhone,
    childName: payload.childName,
    childGrade: payload.childGrade,
    subject: payload.subject,
    subjects: payload.subjects,
    format: payload.format as EnrollmentData["format"],
    preferredTime: payload.preferredTime,
    notes: payload.notes ?? "",
    assessmentDate: payload.assessmentDate ?? undefined,
    assessmentTime: payload.assessmentTime ?? undefined,
    status: "Pending",
    createdAt: new Date().toISOString(),
    confirmationCode: payload.confirmationCode,
  } satisfies EnrollmentData;
}
