import type { RefObject } from "react";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { BUSINESS_VERIFICATION_INFO, INVITE } from "../constants";

/** Gap between popover bottom edge and top of the info button (px). */
const ANCHOR_GAP_PX = 16;
const VIEW_MARGIN = 8;

interface BusinessVerificationInfoModalProps {
  open: boolean;
  onClose: () => void;
  anchorRef: RefObject<HTMLElement | null>;
}

export default function BusinessVerificationInfoModal({ open, onClose, anchorRef }: BusinessVerificationInfoModalProps) {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelPos, setPanelPos] = useState<{ top: number; left: number } | null>(null);

  const copy = INVITE.isVerified ? BUSINESS_VERIFICATION_INFO.verified : BUSINESS_VERIFICATION_INFO.unverified;

  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    const panel = panelRef.current;
    if (!open || !anchor || !panel) return;

    const a = anchor.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    const gap = ANCHOR_GAP_PX;

    let left = a.left;
    let top = a.top - p.height - gap;

    left = Math.max(VIEW_MARGIN, Math.min(left, window.innerWidth - p.width - VIEW_MARGIN));

    if (top < VIEW_MARGIN) {
      top = a.bottom + gap;
    }
    top = Math.max(VIEW_MARGIN, Math.min(top, window.innerHeight - p.height - VIEW_MARGIN));

    setPanelPos({ top, left });
  }, [open, anchorRef]);

  useLayoutEffect(() => {
    if (!open) {
      setPanelPos(null);
      return;
    }
    updatePosition();
  }, [open, updatePosition, copy.title, copy.body]);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const onScrollOrResize = () => updatePosition();
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("scroll", onScrollOrResize, true);
    return () => {
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, [open, updatePosition]);

  if (!open) return null;

  return (
    <div className="review-info-popover-root" role="presentation">
      <div
        ref={panelRef}
        className="review-info-popover"
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        style={
          panelPos
            ? { position: "fixed", top: panelPos.top, left: panelPos.left, zIndex: 1 }
            : { position: "fixed", top: -9999, left: 0, visibility: "hidden" as const, zIndex: 1 }
        }
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="review-info-popover__close"
          aria-label="Close"
          onClick={onClose}
        >
          <span className="review-info-popover__close-sprite" aria-hidden="true" />
        </button>
        <h3 id={titleId} className="review-info-popover__title">
          {copy.title}
        </h3>
        <p className="review-info-popover__body">{copy.body}</p>
        <a
          href={BUSINESS_VERIFICATION_INFO.aboutUrl}
          className="review-info-popover__cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          {BUSINESS_VERIFICATION_INFO.aboutLabel}
        </a>
      </div>
    </div>
  );
}
