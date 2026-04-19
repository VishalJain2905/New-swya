import { INVITE, PRIVACY_NOTES } from "../constants";
import FormFooter from "./FormFooter";

interface AcceptInvitationProps {
  userName: string;
  userEmail: string;
  onPrev: () => void;
  onAccept: () => void;
}

export default function AcceptInvitation({ userName, userEmail, onPrev, onAccept }: AcceptInvitationProps) {
  return (
    <div>
      <h2 className="accept-invitation__title">Review and accept invitation</h2>

      <p className="accept-invitation__line">
        <span className="accept-invitation__muted">Name:</span>{" "}
        <strong className="accept-invitation__strong">{userName || "example name"}</strong>
      </p>
      <p className="accept-invitation__line accept-invitation__line--email">
        <span className="accept-invitation__muted">Email address:</span>{" "}
        <strong className="accept-invitation__strong">{userEmail}</strong>
        <span className="accept-invitation__badge">i</span>
      </p>

      <div className="accept-invitation__privacy">
        <ol className="accept-invitation__list">
          {PRIVACY_NOTES.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ol>
      </div>

      <p className="accept-invitation__terms">
        By accepting this invitation, you&apos;ll be added to {INVITE.businessName}&apos;s business portfolio and agree
        to the <a href="#">Meta Terms of Service</a> and <a href="#">Commercial Terms</a>.
      </p>

      <FormFooter
        currentStep={3}
        totalSteps={3}
        onContinue={onAccept}
        onPrevious={onPrev}
        nextLabel="Accept invitation"
        primaryTone="facebook"
      />
    </div>
  );
}
