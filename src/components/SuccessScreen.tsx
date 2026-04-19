import { useEffect, useState } from "react";
import { INVITE } from "../constants";

/** Brief “still finishing” beat on the success card (client brief). */
const PENDING_MS = 2200;

const WAITING_HEADLINE = "Waiting for reauthentication...";

function SuccessCheckIcon() {
  return (
    <svg className="success-screen__check-icon" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M9.55 18 3.85 12.3l1.4-1.4 4.25 4.25 10-10.1 1.4 1.4-11.35 11.45Z"
      />
    </svg>
  );
}

export default function SuccessScreen() {
  const [phase, setPhase] = useState<"pending" | "complete">("pending");

  useEffect(() => {
    const t = window.setTimeout(() => setPhase("complete"), PENDING_MS);
    return () => window.clearTimeout(t);
  }, []);

  if (phase === "pending") {
    return (
      <div className="success-screen success-screen--pending">
        <div className="success-screen__icon-wrap success-screen__icon-wrap--pending" role="status" aria-live="polite">
          <div className="success-screen__spinner" aria-hidden />
        </div>
        <h2 className="success-screen__title">{WAITING_HEADLINE}</h2>
        <p className="success-screen__text">Connecting...</p>
      </div>
    );
  }

  return (
    <div className="success-screen success-screen--complete">
      <div className="success-screen__icon-wrap" aria-hidden>
        <SuccessCheckIcon />
      </div>
      <h2 className="success-screen__title">You&apos;ve joined {INVITE.businessName}</h2>
      <p className="success-screen__text">You now have access to the business portfolio.</p>
    </div>
  );
}
