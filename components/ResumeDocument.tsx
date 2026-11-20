"use client";

import Link from "next/link";
import { LuArrowLeft, LuDownload, LuFacebook, LuGithub, LuMail, LuMapPin, LuPrinter } from "react-icons/lu";
import { resume } from "@/lib/resume";

/**
 * Section: bold, letter-spaced uppercase heading. Sections after the first are
 * separated by a thin grey rule (the header has its own thick rule).
 */
function Section({
  title,
  first = false,
  tight = false,
  children,
}: {
  title: string;
  first?: boolean;
  /** Closer rows in print, for one-line entries */
  tight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`break-inside-avoid-page ${first ? "mt-3.5" : "mt-3.5 border-t border-neutral-300 pt-3"} print:mt-2.5 ${first ? "" : "print:pt-2"}`}
    >
      <h2 className="text-[13px] font-extrabold uppercase tracking-[0.12em]">{title}</h2>
      {/* Slightly tighter in print so everything fits on one A4 page */}
      <div className={`mt-1.5 space-y-2 ${tight ? "print:space-y-1" : "print:space-y-1.5"}`}>{children}</div>
    </section>
  );
}

/** One entry: small grey "Place | Dates" line, bold title, optional description. */
function Entry({ meta, title, children }: { meta: string[]; title: string; children?: React.ReactNode }) {
  return (
    <div className="break-inside-avoid">
      <p className="text-[10px] text-neutral-500">{meta.filter(Boolean).join(" | ")}</p>
      <h3 className="text-[11.5px] font-bold leading-snug">{title}</h3>
      {children && <p className="mt-0.5 text-[10.5px] leading-[1.5] text-neutral-700">{children}</p>}
    </div>
  );
}

/** Compact one-line entry for certifications: bold title + grey issuer, date on the right. */
function CertEntry({ title, issuer, date }: { title: string; issuer: string; date: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 break-inside-avoid">
      <p className="text-[11px]">
        <span className="font-bold">{title}</span>
        <span className="text-[10px] text-neutral-500"> | {issuer}</span>
      </p>
      <span className="shrink-0 text-[10px] text-neutral-500">{date}</span>
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
          <h1 className="text-[28px] font-extrabold uppercase leading-none tracking-[0.04em] sm:text-[32px]">
            {resume.name}
          </h1>
          <p className="mt-1.5 text-[12px] text-neutral-700">{resume.tagline}</p>
          <ul className="mt-2.5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[10.5px] text-neutral-700">
            <li className="flex items-center gap-1.5">
              <LuMail className="size-3 text-neutral-900" aria-hidden />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li className="flex items-center gap-1.5">
              <LuMapPin className="size-3 text-neutral-900" aria-hidden />
              {contact.location}
            </li>
            <li className="flex items-center gap-1.5">
              <LuGithub className="size-3 text-neutral-900" aria-hidden />
              <a href={`https://${contact.github}`}>{contact.github}</a>
            </li>
            <li className="flex items-center gap-1.5">
              <LuFacebook className="size-3 text-neutral-900" aria-hidden />
              <a href={`https://www.${contact.facebook}`}>{contact.facebook}</a>
            </li>
          </ul>
        </header>

        <hr className="mt-4 border-t-[2.5px] border-neutral-900" />

        <Section title="About Me" first>
          <p className="text-[10.5px] leading-[1.55] text-neutral-700">{resume.summary}</p>
        </Section>

        <Section title="Education">
          {resume.education.map((e) => (
            <Entry key={e.school} meta={[e.school, e.period ?? ""]} title={e.degree} />
          ))}
        </Section>

        <Section title="Projects & Experience">
          {resume.experience.map((e) => (
            <Entry key={e.title} meta={[e.subtitle, e.period]} title={e.title}>
              {e.description}
            </Entry>
          ))}
        </Section>

        <Section title="Certifications" tight>
          {resume.certifications.map((c) => (
            <CertEntry key={c.title} title={c.title} issuer={c.issuer} date={c.date} />
          ))}
        </Section>

        <Section title="Skills">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-[10.5px] text-neutral-700 sm:grid-cols-3 print:gap-y-0.5">
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
