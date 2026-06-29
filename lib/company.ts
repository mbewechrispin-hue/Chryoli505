export const COMPANY_EMAIL = "yolicinvestmentsltd@gmail.com";

export const WHATSAPP_CONTACTS = [
  {
    label: "+260 774 652 383",
    value: "260774652383",
    href: "https://wa.me/260774652383"
  },
  {
    label: "+260 750 027 926",
    value: "260750027926",
    href: "https://wa.me/260750027926"
  },
  {
    label: "+260 573 442 728",
    value: "260573442728",
    href: "https://wa.me/260573442728"
  }
] as const;

export const PRIMARY_PHONE = WHATSAPP_CONTACTS[0].label;