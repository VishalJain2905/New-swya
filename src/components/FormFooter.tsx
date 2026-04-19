interface FormFooterProps {
  currentStep: number;
  totalSteps: number;
  onContinue: () => void;
  onPrevious?: () => void;
  nextLabel?: string;
  isDisabled?: boolean;
  primaryTone?: "default" | "facebook";
}

function ChevronLeft() {
  return (
    <svg className="form-footer__icon" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="form-footer__icon" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FormFooter({
  currentStep,
  totalSteps,
  onContinue,
  onPrevious,
  nextLabel = "Continue",
  isDisabled = false,
  primaryTone = "default",
}: FormFooterProps) {
  const stepLabel = (
    <span className="form-footer__step">
      {currentStep} of {totalSteps}
    </span>
  );

  const continueBtn = (
    <button
      type="button"
      onClick={onContinue}
      disabled={isDisabled}
      className={[
        "form-footer__btn",
        "form-footer__btn--primary",
        primaryTone === "facebook" ? "form-footer__btn--primary-facebook" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {nextLabel}
      {nextLabel === "Continue" && <ChevronRight />}
    </button>
  );

  return (
    <div className={onPrevious ? "form-footer" : "form-footer form-footer--single"}>
      {onPrevious ? (
        <>
          <button type="button" onClick={onPrevious} className="form-footer__btn form-footer__btn--secondary">
            <ChevronLeft /> Previous
          </button>
          {stepLabel}
          {continueBtn}
        </>
      ) : (
        <>
          {stepLabel}
          {continueBtn}
        </>
      )}
    </div>
  );
}
