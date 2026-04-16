import { useState } from "react";
import { TextInput, Checkbox, FieldLabel } from "./FormFields";
import FormFooter from "./FormFooter";
import { INVITE } from "../constants";

interface InviteCardProps {
  onNext: (data: { firstName: string; surname: string; email: string }) => void;
}

export default function InviteCard({ onNext }: InviteCardProps) {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState(INVITE.defaultEmail);
  const [marketing, setMarketing] = useState(false);

  const isValid = firstName.trim().length > 0 && surname.trim().length > 0 && email.trim().length > 0;

  return (
    <div className="invite-card">
      <div className="invite-card__body">
        <div className="invite-card__hero">
        <img
          src={INVITE.logoImageUrl}
          alt={`${INVITE.businessName} logo`}
          className="invite-card__logo"
        />

        <h1 className="invite-card__title">You&apos;re invited to join {INVITE.businessName}</h1>

        <div className="invite-card__intro">
          <p>
            <strong>{INVITE.inviterName}</strong> invited you to join the <strong>{INVITE.businessName}</strong> business
            portfolio. Portfolios connect a business&apos;s Facebook Pages and other business assets so that you can
            manage them all in one place.
          </p>
          <p>
            Depending on your access, you can do things such as manage Pages, Instagram accounts, ad accounts and
            people&apos;s assignments.
          </p>
        </div>
        </div>

        <hr className="invite-card__hr invite-card__hr--after-hero" />

        <div className="invite-card__form">
        <p className="invite-card__instruction">
          Enter your name as you want it to appear in the business portfolio.
        </p>

        <div className="invite-card__name-row">
          <div>
            <FieldLabel htmlFor="firstName">First name</FieldLabel>
            <TextInput id="firstName" value={firstName} onChange={setFirstName} />
          </div>
          <div>
            <FieldLabel htmlFor="surname">Surname</FieldLabel>
            <TextInput id="surname" value={surname} onChange={setSurname} />
          </div>
        </div>

        <div>
          <FieldLabel
            htmlFor="email"
            info
            hint="Notifications about the business portfolio will be sent to this email address."
          >
            Business email address
          </FieldLabel>
          <TextInput id="email" type="email" value={email} onChange={setEmail} variant="muted" />
        </div>

        <div className="invite-card__marketing">
          <Checkbox id="marketing" checked={marketing} onChange={setMarketing}>
            Receive marketing messages (e.g. email, social) from Meta related to its business, products and services.
            Withdraw your consent and unsubscribe at any time.
          </Checkbox>
        </div>
        </div>

        <hr className="invite-card__hr invite-card__hr--form" />

        <p className="invite-card__legal">
        For more information about how Meta handles your data, please read our{" "}
        <a href="#" className="invite-card__link">
          Privacy Policy
        </a>
        .
        </p>
        <p className="invite-card__legal">
        If you don&apos;t know this business, you can{" "}
        <button type="button" className="invite-card__text-button" onClick={() => alert("Invitation declined.")}>
          decline the invitation
        </button>
        .
        </p>
      </div>

      <FormFooter
        currentStep={1}
        totalSteps={3}
        onContinue={() => onNext({ firstName, surname, email })}
        isDisabled={!isValid}
      />
    </div>
  );
}
