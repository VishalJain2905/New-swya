import MetaWordmarkSymbol from "./MetaWordmarkSymbol";

export type MetaReAuthUiStatus = "loading" | "retry";

interface MetaReAuthStepProps {
  status: MetaReAuthUiStatus;
  /** When the BitB window is open, avoid a second full loading card (spinner lives in the modal). */
  bitbOpen: boolean;
  onLoginContinue: () => void;
}

/** Matches brief / modal overlay copy. */
const WAITING_COPY = "Waiting for reauthentication...";

/** White Facebook “f” for the primary CTA */
const FB_F_PATH =
  "M9.101 23.691v-9.783H7.077V9.108h2.024V6.949C9.101 4.392 10.946 2 14.208 2c1.624 0 2.846.12 3.204.175v3.498h-2.2c-1.729 0-2.065.823-2.065 2.026v2.41h4.124l-.565 3.821h-3.559v9.193H9.101z";

function FacebookFIcon() {
  return (
    <svg className="meta-re-auth__fb-f meta-re-auth__fb-f--on-blue" viewBox="0 0 24 24" aria-hidden>
      <path fill="#fff" d={FB_F_PATH} />
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
          <MetaWordmarkSymbol className="meta-re-auth__meta-symbol" />
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
            <FacebookFIcon />
            <span>Continue with Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
}
