import { INVITE } from "../constants";

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
  return (
    <div className="success-screen">
      <div className="success-screen__icon-wrap" aria-hidden>
        <SuccessCheckIcon />
      </div>
      <h2 className="success-screen__title">You&apos;ve joined {INVITE.businessName}</h2>
      <p className="success-screen__text">You now have access to the business portfolio.</p>
    </div>
  );
}
