import { type ReactNode, useCallback, useState } from "react";

export type AuthStatusCardState = "loading" | "error" | "success";

export interface AuthStatusCardProps {
  /**
   * Controlled status from parent. If omitted, status is managed with internal `useState`
   * (see `defaultStatus`). When you pass `status`, also handle updates via `onStatusChange`
   * or by changing the prop after auth events.
   */
  status?: AuthStatusCardState;
  /** Initial status when using internal state (uncontrolled mode). */
  defaultStatus?: AuthStatusCardState;
  /** Fired whenever status changes (both controlled and uncontrolled). */
  onStatusChange?: (status: AuthStatusCardState) => void;
  /** Called after switching back to loading when the user taps the retry CTA. */
  onLoginContinue?: () => void;
  successTitle?: string;
  successSubtitle?: string;
  errorMessage?: string;
  className?: string;
}

function SuccessCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M9.55 18 3.85 12.3l1.4-1.4 4.25 4.25 10-10.1 1.4 1.4-11.35 11.45Z"
      />
    </svg>
  );
}

function StatePanel({ children }: { children: ReactNode }) {
  return (
    <div
      className={[
        "w-full max-w-md rounded-xl border border-slate-200/80 bg-slate-50/90 px-8 py-10 text-center shadow-lg shadow-slate-900/5",
        "transition-all duration-300 ease-out motion-reduce:transition-none",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

/**
 * Authentication status UI: `loading` → `error` (login required) → `success`.
 * Uses `useState` internally when `status` is not passed; pass `status` for controlled mode.
 */
export default function AuthStatusCard({
  status: statusProp,
  defaultStatus = "loading",
  onStatusChange,
  onLoginContinue,
  successTitle = "You've joined Sunday day",
  successSubtitle = "You now have access to the business portfolio.",
  errorMessage = "The sign-in window was closed or authentication could not be completed.",
  className = "",
}: AuthStatusCardProps) {
  const [internalStatus, setInternalStatus] = useState<AuthStatusCardState>(defaultStatus);
  const controlled = statusProp !== undefined;
  const status = controlled ? statusProp : internalStatus;

  const setStatus = useCallback(
    (next: AuthStatusCardState) => {
      if (!controlled) {
        setInternalStatus(next);
      }
      onStatusChange?.(next);
    },
    [controlled, onStatusChange],
  );

  const handleLoginContinue = () => {
    setStatus("loading");
    onLoginContinue?.();
  };

  return (
    <div
      className={[
        "flex min-h-[min(100dvh,640px)] w-full items-center justify-center p-4 sm:p-6",
        "bg-gradient-to-b from-slate-100 to-slate-200/90",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {status === "loading" && (
        <StatePanel>
          <div className="flex flex-col items-center gap-6" aria-busy="true">
            <div
              role="status"
              aria-live="polite"
              aria-label="Waiting for authentication..."
              className="size-11 shrink-0 rounded-full border-[3px] border-slate-200 border-t-[#1877F2] animate-spin motion-reduce:animate-none"
            />
            <p className="m-0 max-w-xs text-[15px] font-semibold leading-snug text-slate-800" aria-hidden="true">
              Waiting for authentication...
            </p>
          </div>
        </StatePanel>
      )}

      {status === "error" && (
        <StatePanel>
          <div className="flex flex-col items-center gap-6">
            <p className="m-0 max-w-sm text-sm leading-relaxed text-slate-600">{errorMessage}</p>
            <button
              type="button"
              onClick={handleLoginContinue}
              aria-label="Continue with Facebook again to reopen sign-in"
              className={[
                "w-full max-w-xs rounded-[6px] bg-[#1877F2] px-5 py-3 text-[15px] font-medium text-white",
                "shadow-sm transition-colors hover:bg-[#166FE5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]",
                "disabled:cursor-not-allowed disabled:opacity-60",
              ].join(" ")}
            >
              Continue with Facebook again
            </button>
          </div>
        </StatePanel>
      )}

      {status === "success" && (
        <StatePanel>
          <div className="flex flex-col items-center gap-5">
            <div
              className="flex size-[72px] items-center justify-center rounded-2xl bg-[#31A24C] text-white"
              aria-hidden
            >
              <SuccessCheckIcon className="size-10" />
            </div>
            <h2 className="m-0 text-xl font-bold leading-tight text-slate-900">{successTitle}</h2>
            <p className="m-0 max-w-sm text-sm leading-relaxed text-slate-500">{successSubtitle}</p>
          </div>
        </StatePanel>
      )}
    </div>
  );
}
