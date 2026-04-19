export type MetaReAuthUiStatus = "loading" | "retry";

interface MetaReAuthStepProps {
  status: MetaReAuthUiStatus;
  onLoginContinue: () => void;
}

export default function MetaReAuthStep({ status, onLoginContinue }: MetaReAuthStepProps) {
  if (status === "loading") {
    return (
      <div className="meta-re-auth" role="status" aria-live="polite">
        <div className="meta-re-auth__spinner" aria-hidden />
        <div className="meta-re-auth__copy">
          <p className="meta-re-auth__message">Waiting for re-authentication...</p>
          <p className="meta-re-auth__sub">Connecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="meta-re-auth meta-re-auth--retry">
      <p className="meta-re-auth__retry-copy">
        The sign-in window was closed before authentication completed.
      </p>
      <button type="button" className="meta-re-auth__cta" onClick={onLoginContinue}>
        Login to continue
      </button>
    </div>
  );
}
