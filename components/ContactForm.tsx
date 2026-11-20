"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuCircleCheck, LuLoaderCircle, LuSend } from "react-icons/lu";
import { EASE_OUT, profile } from "@/lib/data";

// Web3Forms delivers submissions to the email that owns this key (set in .env.local).
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const ENDPOINT = "https://api.web3forms.com/submit";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-line bg-shade-1/70 px-4 py-3 text-sm text-ink placeholder:text-muted/70 outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:ring-4 focus:ring-accent/15 sm:text-base";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!ACCESS_KEY) {
      setStatus("error");
      setErrorMessage("The contact form isn't connected yet.");
      return;
    }

    const fields = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...fields,
          access_key: ACCESS_KEY,
          subject: `Portfolio message: ${fields.subject}`,
          from_name: `${profile.name} Portfolio`,
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.success) {
        setStatus("success");
        form.reset();
      } else {
        throw new Error(json.message ?? json.body?.message ?? "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const sending = status === "sending";

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-line bg-surface p-5 shadow-md sm:p-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
    >
      {/* Honeypot: real visitors never see or tick this; bots that do are rejected */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name">
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
          />
        </Field>
        <Field label="Email" htmlFor="contact-email">
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="your@email.com"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Subject" htmlFor="contact-subject">
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          maxLength={150}
          placeholder="What's this about?"
          className={inputClass}
        />
      </Field>

      <Field label="Message" htmlFor="contact-message">
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          placeholder="Your message here..."
          className={`${inputClass} resize-y`}
        />
      </Field>

      <motion.button
        type="submit"
        disabled={sending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-white shadow-[0_10px_30px_-10px_var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-70"
        whileHover={sending ? undefined : { scale: 1.015 }}
        whileTap={sending ? undefined : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {sending ? (
          <>
            <LuLoaderCircle className="size-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            <LuSend className="size-4" aria-hidden />
            Send Message
          </>
        )}
      </motion.button>

      {/* Result message */}
      <div aria-live="polite">
        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.p
              key="success"
              className="flex items-start gap-2 text-sm font-medium"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <LuCircleCheck className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              Message sent! Thanks for reaching out. I&apos;ll get back to you soon.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              key="error"
              className="flex items-start gap-2 text-sm font-medium text-accent"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <LuCircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>
                {errorMessage} You can email me directly at{" "}
                <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
                  {profile.email}
                </a>
                .
              </span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  );
}
