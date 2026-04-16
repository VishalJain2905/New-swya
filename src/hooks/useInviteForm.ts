import { useState } from "react";
import type { InviteFormData } from "../types/invite";

const DEFAULT_EMAIL = "rubenstokess@hotmail.com";

export function useInviteForm() {
  const [formData, setFormData] = useState<InviteFormData>({
    firstName: "",
    surname: "",
    businessEmail: DEFAULT_EMAIL,
    receiveMarketing: false,
  });

  const updateField = <K extends keyof InviteFormData>(
    field: K,
    value: InviteFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = (): boolean => {
    return (
      formData.firstName.trim().length > 0 &&
      formData.surname.trim().length > 0 &&
      formData.businessEmail.trim().length > 0
    );
  };

  return { formData, updateField, isStepValid };
}
