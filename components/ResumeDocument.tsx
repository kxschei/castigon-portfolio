"use client";

import Link from "next/link";
import { LuArrowLeft, LuDownload, LuFacebook, LuGithub, LuMail, LuMapPin, LuPrinter } from "react-icons/lu";
import { resume } from "@/lib/resume";

/** Section heading: bold uppercase label with a rule underneath (as in the reference PDF). */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-3.5 break-inside-avoid-page print:mt-2.5">
      <h2 className="border-b-[1.5px] border-neutral-900 pb-1 text-[11px] font-extrabold uppercase tracking-[0.18em]">
        {title}
      </h2>
      {/* Slightly tighter in print so everything fits on one A4 page */}
      <div className="mt-2 space-y-2 print:space-y-1.5">{children}</div>
    </section>
  );
}

/** One entry: bold title + italic date on the right, italic subtitle, optional body. */
function Entry({
  title,
  date,
  subtitle,
  inline = false,
  children,
}: {
  title: string;
  date?: string;
  subtitle?: string;
  /** Show the subtitle on the title line (compact, used for certifications). */
  inline?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="break-inside-avoid">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[12px] font-bold">
          {title}
          {inline && subtitle && (
            <span className="font-semibold italic text-neutral-600">
              {" "}
              <span className="text-[10.5px]">— {subtitle}</span>
            </span>
          )}
        </h3>
        {date && <span className="shrink-0 text-[10.5px] italic text-neutral-500">{date}</span>}
      </div>
      {!inline && subtitle && (
        <p className="text-[10.5px] font-semibold italic text-neutral-700">{subtitle}</p>
      )}
      {children && <p className="mt-0.5 text-[10.5px] leading-[1.5] text-neutral-700">{children}</p>}
    </div>
  );
}

export default function ResumeDocument() {
  const { contact } = resume;

  return (
    <div className="min-h-screen bg-bg px-4 py-6 print:bg-white print:p-0 sm:py-10">
      {/* Toolbar (hidden when printing) */}
      <div className="mx-auto mb-6 flex max-w-[210mm] flex-wrap items-center justify-between gap-3 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          <LuArrowLeft className="size-4" aria-hidden /> Back to portfolio
        </Link>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-accent hover:text-accent"
          >
            <LuPrinter className="size-4" aria-hidden /> Print / Save as PDF
          </button>
          <a
            href={resume.pdf}
            download
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm"
          >
            <LuDownload className="size-4" aria-hidden /> Download PDF
          </a>
        </div>
      </div>

      {/* A4 sheet — always light, like paper */}
      <article className="mx-auto w-full max-w-[210mm] bg-white px-[8mm] py-[10mm] font-sans text-neutral-900 shadow-md sm:min-h-[297mm] sm:px-[16mm] sm:py-[14mm] print:min-h-0 print:max-w-none print:px-[14mm] print:pb-[6mm] print:pt-[8mm] print:shadow-none">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-[26px] font-extrabold uppercase leading-none tracking-[0.06em] sm:text-[30px]">
            {resume.name}
          </h1>
          <p className="mt-2 text-[11px] italic text-neutral-600">{resume.tagline}</p>
          <ul className="mt-2.5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[10.5px] text-neutral-700">
            <li className="flex items-center gap-1.5">
              <LuMail className="size-3 text-accent" aria-hidden />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li className="flex items-center gap-1.5">
              <LuMapPin className="size-3 text-accent" aria-hidden />
              {contact.location}
            </li>
            <li className="flex items-center gap-1.5">
              <LuGithub className="size-3 text-accent" aria-hidden />
              <a href={`https://${contact.github}`}>{contact.github}</a>
            </li>
            <li className="flex items-center gap-1.5">
              <LuFacebook className="size-3 text-accent" aria-hidden />
              <a href={`https://www.${contact.facebook}`}>{contact.facebook}</a>
            </li>
          </ul>
        </header>

        <hr className="mt-4 border-t-[2.5px] border-neutral-900" />

        <Section title="About Me">
          <p className="text-[10.5px] leading-[1.55] text-neutral-700">{resume.summary}</p>
        </Section>

        <Section title="Education">
          {resume.education.map((e) => (
            <Entry key={e.school} title={e.school} date={e.period} subtitle={e.degree} />
          ))}
        </Section>

        <Section title="Experience">
          {resume.experience.map((e) => (
            <Entry key={e.title} title={e.title} date={e.period} subtitle={e.subtitle}>
              {e.description}
            </Entry>
          ))}
        </Section>

        <Section title="Certifications">
          {resume.certifications.map((c) => (
            <Entry key={c.title} title={c.title} date={c.date} subtitle={c.issuer} inline />
          ))}
        </Section>

        <Section title="Skills">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-[10.5px] text-neutral-700 sm:grid-cols-3 print:grid-cols-4">
            {resume.skills.map((s) => (
              <li key={s} className="flex gap-2">
                <span aria-hidden>•</span>
                {s}
              </li>
            ))}
          </ul>
        </Section>
      </article>
    </div>
  );
}
