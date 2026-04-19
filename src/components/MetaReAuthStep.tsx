export type MetaReAuthUiStatus = "loading" | "retry";

interface MetaReAuthStepProps {
  status: MetaReAuthUiStatus;
  onLoginContinue: () => void;
}

/** Matches client copy (informal spelling from brief). */
const WAITING_COPY = "Waiting for reauthentication...";

export default function MetaReAuthStep({ status, onLoginContinue }: MetaReAuthStepProps) {
  if (status === "loading") {
    return (
      <div className="meta-re-auth">
        <div className="meta-re-auth__card" role="status" aria-live="polite" aria-busy="true">
          <div className="meta-re-auth__loader-slot" aria-hidden>
            <div className="meta-re-auth__spinner" />
          </div>
          <p className="meta-re-auth__message">{WAITING_COPY}</p>
          <p className="meta-re-auth__sub">Connecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="meta-re-auth">
      <div className="meta-re-auth__card meta-re-auth__card--retry">
        <p className="meta-re-auth__retry-copy">
          The sign-in window was closed before authentication completed.
        </p>
        <button
          type="button"
          className="meta-re-auth__cta"
          onClick={onLoginContinue}
          aria-label="Continue with Facebook again to reopen sign-in"
        >
          Continue with Facebook again
        </button>
      </div>
    </div>
  );
}
