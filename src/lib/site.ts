export const SITE = {
  name: "SATYA POWER TECHNOLOGYS",
  tagline: "Service first, Sales next",
  phone: "+91 86881 51526",
  phoneAlt: "+91 95428 40444",
  phoneRaw: "918688151526",
  email: "satyapowertechnologys@gmail.com",
  address:
    "House No. 49/50, Vayushakthi Nagar Road No.1, Dammaiguda, Hyderabad - 500083, Telangana, India",
  gstin: "37BILPL7684K1ZD",
  founded: 2013,
  ceo: "Mr. Deepak Singh",
  website: "www.satyapowertechnologys.in",
  whatsappMsg: "Hello SATYA POWER TECHNOLOGYS, I'd like a quote.",
};

export const whatsappLink = (msg = SITE.whatsappMsg) =>
  `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(msg)}`;
