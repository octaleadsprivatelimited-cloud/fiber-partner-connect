export const SITE = {
  name: "Fujitomo Electronics",
  tagline: "Your Trusted Partner for Fiber Optic Solutions",
  phone: "+91 98765 43210",
  phoneRaw: "919876543210",
  email: "info@fujitomoelectronics.in",
  address: "Hyderabad, Telangana, India",
  founded: 2023,
  ceo: "Mr. Deepak Singh",
  website: "www.fujitomoelectronics.in",
  whatsappMsg: "Hello Fujitomo, I'd like a quote.",
};

export const whatsappLink = (msg = SITE.whatsappMsg) =>
  `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(msg)}`;
