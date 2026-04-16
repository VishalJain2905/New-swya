import { INVITE } from "../constants";

export default function SuccessScreen() {
  return (
    <div className="success-screen">
      <div className="success-screen__emoji" aria-hidden>
        ✅
      </div>
      <h2 className="success-screen__title">You&apos;ve joined {INVITE.businessName}</h2>
      <p className="success-screen__text">You now have access to the business portfolio.</p>
    </div>
  );
}
