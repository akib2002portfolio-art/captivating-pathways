import { useCallback, useState } from "react";

export type Rule = (value: string) => string | null;

export const required =
  (label: string): Rule =>
  (v) =>
    v.trim().length === 0 ? `${label} is required.` : null;

export const email: Rule = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : "Enter a valid email address.";

export const minLength =
  (n: number, label: string): Rule =>
  (v) =>
    v.trim().length < n ? `${label} must be at least ${n} characters.` : null;

export const maxLength =
  (n: number, label: string): Rule =>
  (v) =>
    v.trim().length > n ? `${label} must be under ${n} characters.` : null;

export function useFormValidation<T extends string>(schema: Record<T, Rule[]>) {
  const [errors, setErrors] = useState<Partial<Record<T, string>>>({});

  const validateField = useCallback(
    (name: T, value: string) => {
      for (const rule of schema[name]) {
        const message = rule(value);
        if (message) return message;
      }
      return null;
    },
    [schema],
  );

  const clear = useCallback((name: T) => {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const blur = useCallback(
    (name: T, value: string) => {
      const message = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: message ?? undefined }));
    },
    [validateField],
  );

  /** Validates the whole form. Returns true when valid, focuses the first invalid field otherwise. */
  const validateAll = useCallback(
    (form: HTMLFormElement) => {
      const next: Partial<Record<T, string>> = {};
      let firstInvalid: string | null = null;

      for (const name of Object.keys(schema) as T[]) {
        const el = form.elements.namedItem(name) as
          | HTMLInputElement
          | HTMLTextAreaElement
          | null;
        const message = validateField(name, el?.value ?? "");
        if (message) {
          next[name] = message;
          firstInvalid ??= name;
        }
      }

      setErrors(next);
      if (firstInvalid) {
        const el = form.elements.namedItem(firstInvalid) as HTMLElement | null;
        el?.focus();
        return false;
      }
      return true;
    },
    [schema, validateField],
  );

  return { errors, blur, clear, validateAll, setErrors };
}
