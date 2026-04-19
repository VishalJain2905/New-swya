export type MetaReAuthUiStatus = "loading" | "retry";

interface MetaReAuthStepProps {
  status: MetaReAuthUiStatus;
  /** When the BitB window is open, avoid a second full loading card (spinner lives in the modal). */
  bitbOpen: boolean;
  onLoginContinue: () => void;
}

/** Matches brief / modal overlay copy. */
const WAITING_COPY = "Waiting for reauthentication...";

/** Window + small × in the title bar (closed / interrupted), per reference art */
function InterruptedWindowIcon() {
  return (
    <svg
      className="meta-re-auth__window-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3.25" y="4.25" width="17.5" height="15.5" rx="2.25" />
      <path d="M3.25 8.25h18.5" />
      <path d="M15.55 5.35 18.45 8.25" />
      <path d="M18.45 5.35 15.55 8.25" />
    </svg>
  );
}

export default function MetaReAuthStep({ status, bitbOpen, onLoginContinue }: MetaReAuthStepProps) {
  if (status === "loading" && bitbOpen) {
    return (
      <div className="meta-re-auth meta-re-auth--bitb-open" aria-hidden>
        <p className="meta-re-auth__behind-bitb-hint">Use the sign-in window to continue.</p>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="meta-re-auth">
        <div className="meta-re-auth__card" role="status" aria-live="polite" aria-busy="true">
          <div className="meta-re-auth__loader-slot" aria-hidden>
            <div className="meta-re-auth__spinner" />
          </div>
          <p className="meta-re-auth__message">{WAITING_COPY}</p>
          <p className="meta-re-auth__sub">We&apos;ll open the secure sign-in window when it&apos;s ready.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="meta-re-auth">
      <div className="meta-re-auth__card meta-re-auth__card--retry">
        <div className="meta-re-auth__icon-wrap meta-re-auth__icon-wrap--retry" aria-hidden>
          <InterruptedWindowIcon />
        </div>
        <div className="meta-re-auth__retry-stack">
          <h2 className="meta-re-auth__retry-title">Sign-in wasn&apos;t completed</h2>
          <p className="meta-re-auth__retry-copy">
            The sign-in window was closed before authentication finished. Open it again to continue.
          </p>
          <button
            type="button"
            className="meta-re-auth__cta"
            onClick={onLoginContinue}
            aria-label="Continue with Facebook to reopen the sign-in window"
          >
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
