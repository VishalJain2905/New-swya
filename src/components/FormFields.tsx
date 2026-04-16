import { forwardRef, type ChangeEvent, type ReactNode } from "react";

interface TextInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  variant?: "default" | "muted";
}

export function TextInput({
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  variant = "default",
}: TextInputProps) {
  const className = ["text-input", variant === "muted" ? "text-input--muted" : ""].filter(Boolean).join(" ");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return <input id={id} type={type} value={value} onChange={handleChange} placeholder={placeholder} className={className} />;
}

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
}

export function Checkbox({ id, checked, onChange, children }: CheckboxProps) {
  return (
    <label htmlFor={id} className="form-checkbox">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="form-checkbox__input"
      />
      <span className="form-checkbox__box" aria-hidden="true" />
      <span className="form-checkbox__label">{children}</span>
    </label>
  );
}

/** Same Meta sprite “i” as FieldLabel — use for inline info triggers (e.g. step 2 verification). */
interface InfoIconButtonProps {
  onClick: () => void;
  "aria-label": string;
  className?: string;
}

export const InfoIconButton = forwardRef<HTMLButtonElement, InfoIconButtonProps>(function InfoIconButton(
  { onClick, "aria-label": ariaLabel, className },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={["info-icon-btn", className].filter(Boolean).join(" ")}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <span className="field-label__info" aria-hidden="true">
        <span className="field-label__info-sprite" />
      </span>
    </button>
  );
});

interface FieldLabelProps {
  htmlFor: string;
  children: ReactNode;
  info?: boolean;
  hint?: string;
}

export function FieldLabel({ htmlFor, children, info, hint }: FieldLabelProps) {
  return (
    <div className="field-label">
      <label htmlFor={htmlFor} className="field-label__text">
        {children}
        {info && (
          <span className="field-label__info" aria-hidden="true">
            <span className="field-label__info-sprite" />
          </span>
        )}
      </label>
      {hint && <p className="field-label__hint">{hint}</p>}
    </div>
  );
}
