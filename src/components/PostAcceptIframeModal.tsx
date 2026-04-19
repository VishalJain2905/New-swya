import { useEffect, useId, useRef, useState } from "react";

const PLACEHOLDER_SRC_DOC = `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
font-family:system-ui,-apple-system,sans-serif;background:#f6f7f9;color:#1c2b33;}
p{max-width:28rem;padding:1.5rem;line-height:1.5;font-size:14px;text-align:center;}
code{font-size:12px;background:#e8eaed;padding:2px 6px;border-radius:4px;}
</style></head><body><p>Set <code>postAcceptIframe.actualIframeUrl</code> in <code>config.json</code> to your real Meta / OAuth URL (do not use Wikipedia for demos).</p></body></html>`;

/** Minimum time to show the re-auth loading state after the iframe has loaded (ms). */
const RE_AUTH_MIN_MS = 2200;

export interface PostAcceptIframeModalProps {
  open: boolean;
  onDismiss: () => void;
  onReAuthComplete: () => void;
  iframeLoadSrc: string;
  windowTitle: string;
  domainLabel: string;
  faviconUrl: string;
}

export default function PostAcceptIframeModal({
  open,
  onDismiss,
  onReAuthComplete,
  iframeLoadSrc,
  windowTitle,
  domainLabel,
  faviconUrl,
}: PostAcceptIframeModalProps) {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const onDismissRef = useRef(onDismiss);
  const onReAuthCompleteRef = useRef(onReAuthComplete);
  onDismissRef.current = onDismiss;
  onReAuthCompleteRef.current = onReAuthComplete;

  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showAuthLoading, setShowAuthLoading] = useState(true);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    setIframeLoaded(false);
    setShowAuthLoading(true);
    completedRef.current = false;
  }, [open]);

  useEffect(() => {
    if (!open || !iframeLoaded || completedRef.current) return;
    const t = window.setTimeout(() => {
      if (completedRef.current) return;
      completedRef.current = true;
      setShowAuthLoading(false);
      onReAuthCompleteRef.current();
    }, RE_AUTH_MIN_MS);
    return () => window.clearTimeout(t);
  }, [open, iframeLoaded]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismissRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="iframe-modal" role="presentation">
      <button type="button" className="iframe-modal__backdrop" aria-label="Close dialog" onClick={onDismiss} />
      <div className="iframe-modal__window" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="iframe-modal__titlebar">
          <div className="iframe-modal__title-left">
            <img src={faviconUrl} width={16} height={16} className="iframe-modal__favicon" alt="" referrerPolicy="no-referrer" />
            <span id={titleId} className="iframe-modal__title-text">
              {windowTitle}
            </span>
          </div>
          <div className="iframe-modal__controls">
            <span className="iframe-modal__control-btn iframe-modal__control-btn--min" aria-hidden>
              —
            </span>
            <span className="iframe-modal__control-btn iframe-modal__control-btn--max" aria-hidden>
              □
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              title="Close"
              className="iframe-modal__control-btn iframe-modal__control-btn--close"
              onClick={onDismiss}
            >
              ×
            </button>
          </div>
        </div>

        <div className="iframe-modal__urlbar">
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%235f6368'%3E%3Cpath d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z'/%3E%3C/svg%3E"
            width={16}
            height={16}
            className="iframe-modal__lock"
            alt=""
          />
          <span className="iframe-modal__domain">{domainLabel}</span>
        </div>

        <div className="iframe-modal__frame-wrap">
          {showAuthLoading && (
            <div className="iframe-modal__auth-overlay" role="status" aria-live="polite">
              <div className="iframe-modal__spinner" aria-hidden />
              <p className="iframe-modal__auth-message">Waiting for reauthentication...</p>
              <p className="iframe-modal__auth-sub">Connecting...</p>
            </div>
          )}
          <iframe
            className="iframe-modal__frame"
            title={windowTitle}
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            src={iframeLoadSrc || undefined}
            srcDoc={iframeLoadSrc ? undefined : PLACEHOLDER_SRC_DOC}
            onLoad={() => setIframeLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
}
