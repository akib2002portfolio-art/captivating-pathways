import { cn } from "@/lib/utils";

const base =
  "w-full rounded-md border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors";

export function fieldClass(hasError?: boolean) {
  return cn(base, hasError ? "border-destructive" : "border-border focus:border-signal");
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p
      id={id}
      aria-live="polite"
      className={cn(
        "mt-2 text-xs leading-relaxed text-destructive transition-opacity duration-200",
        message ? "opacity-100" : "opacity-0",
      )}
    >
      {message ?? "\u00a0"}
    </p>
  );
}
