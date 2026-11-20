import type { Metadata } from "next";
import ResumeDocument from "@/components/ResumeDocument";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `Resume — ${profile.name}`,
  description: `Resume of ${profile.name}, BSIT student at Holy Cross of Davao College.`,
};

export default function ResumePage() {
  return <ResumeDocument />;
}
