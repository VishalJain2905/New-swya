import { useRef, useState } from "react";
import { INVITE, PROFILE_INFO_DESCRIPTION } from "../constants";
import FormFooter from "./FormFooter";
import { InfoIconButton } from "./FormFields";
import BusinessVerificationInfoModal from "./BusinessVerificationInfoModal";

interface ReviewBusinessProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function ReviewBusiness({ onPrev, onNext }: ReviewBusinessProps) {
  const [verificationInfoOpen, setVerificationInfoOpen] = useState(false);
  const verificationInfoAnchorRef = useRef<HTMLButtonElement>(null);
  const handleDecline = () => alert("Invitation declined.");

  return (
    <div className="review-business">
      <div className="review-business__content">
        <div className="review-business__heading">
          <h2 className="review-business__title">Review business information</h2>

          <div className="review-business__row">
            <img src={INVITE.logoImageUrl} alt={`${INVITE.businessName} logo`} className="review-business__logo" />
            <div className="review-business__meta">
              <p className="review-business__name">{INVITE.businessName}</p>
              <p className="review-business__created">Created on {INVITE.createdDate}</p>
              <p className="review-business__verify-row">
                Business verification:{" "}
                <span className={INVITE.isVerified ? "review-business__verify--yes" : "review-business__verify--no"}>
                  {INVITE.isVerified ? "Verified" : "Unverified"}
                </span>
                <InfoIconButton
                  ref={verificationInfoAnchorRef}
                  aria-label="About business verification"
                  onClick={() => setVerificationInfoOpen(true)}
                />
              </p>
            </div>
          </div>
        </div>

        <hr className="review-business__hr" />

        <div className="review-business__profile-section">
          <p className="review-business__subtitle">Profile information</p>
          <p className="review-business__profile-text">{PROFILE_INFO_DESCRIPTION}</p>
        </div>

        <hr className="review-business__hr" />

        <span className="review-business__caution">
          Use caution accepting requests from a business portfolio that you don&apos;t know. If you don&apos;t know this
          business, you can{" "}
          <button type="button" className="review-business__link" onClick={handleDecline}>
            decline the invitation
          </button>
          .
        </span>
      </div>

      <FormFooter currentStep={2} totalSteps={3} onContinue={onNext} onPrevious={onPrev} />

      <BusinessVerificationInfoModal
        open={verificationInfoOpen}
        onClose={() => setVerificationInfoOpen(false)}
        anchorRef={verificationInfoAnchorRef}
      />
    </div>
  );
}
