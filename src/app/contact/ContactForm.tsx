"use client";

import { useState, useTransition } from "react";
import { clsx } from "@/lib/utils";
import { submitContactMessage } from "./actions";
import { trackLeadSubmitted } from "@/lib/tracking";

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (sent) {
    return (
      <div className="card-luxe flex h-full flex-col justify-center p-10 text-center">
        <p className="eyebrow">Thank you</p>
        <h3 className="mt-3 font-serif text-3xl text-cocoa-300">Your message is on its way.</h3>
        <p className="mt-4 text-base leading-relaxed text-cocoa-50">
          We'll be in touch within one working day. In the meantime, you can always take
          the free review to get matched faster.
        </p>
      </div>
    );
  }

  return (
    <form
      action={(fd) => {
        setError(null);
        const serviceInterest = String(fd.get("service") || "");
        startTransition(async () => {
          const result = await submitContactMessage(fd);
          if (result.ok) {
            setSent(true);
            trackLeadSubmitted({
              conversionType: "contact-form-submitted",
              serviceInterest: serviceInterest || undefined,
            });
          } else setError(result.error);
        });
      }}
      className="card-luxe flex flex-col gap-5 p-8 sm:p-10"
    >
      <Field label="Your name" name="name" required />
      <Field label="Business name (optional)" name="businessName" />
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone (optional)" name="phone" />
      <div>
        <label className="text-xs uppercase tracking-widest text-champagne-dark">What do you need help with?</label>
        <select
          name="service"
          className="mt-2 w-full rounded-2xl border border-sand-100 bg-cream-50 px-4 py-3.5 text-sm text-cocoa-300 outline-none transition focus:border-cocoa-300"
        >
          {[
            "Not sure yet",
            "Bookkeeping",
            "Year-End Accounts",
            "Tax & VAT",
            "Payroll & Auto-Enrolment",
            "Advisory & Planning",
            "Switching accountant",
          ].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs uppercase tracking-widest text-champagne-dark">Your message</label>
        <textarea
          name="message"
          rows={5}
          required
          className="mt-2 w-full rounded-2xl border border-sand-100 bg-cream-50 px-4 py-3.5 text-sm text-cocoa-300 outline-none transition focus:border-cocoa-300"
          placeholder="Tell us a little about your business and what's not working with your current setup…"
        />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className={clsx("btn-primary mt-2", pending && "opacity-60")}
      >
        {pending ? "Sending…" : "Send message"}
      </button>
      <p className="text-[11px] text-cocoa-50/70">
        By sending us a message, you agree to be contacted in response. We'll never share your details.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-champagne-dark">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-2xl border border-sand-100 bg-cream-50 px-4 py-3.5 text-sm text-cocoa-300 outline-none transition focus:border-cocoa-300"
      />
    </div>
  );
}
