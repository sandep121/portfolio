// Site-wide configuration. Edit values only.

export const site = {
  domain: "sandeep.geeksglitch.com",
  owner: {
    fullName: "Sandeep Kumar",
    location: "Remote preferred; open for onsite",
  },
  contact: {
    email: "sandeep@geeksglitch.com",
    phone: "6202352763",
    linkedin: "https://www.linkedin.com/in/your-handle",
    github: "https://github.com/your-handle",
    resumeUrl: "/resume.pdf",
  },
  navigation: [
    { label: "About", path: "/#about" },
    { label: "Projects", path: "/projects" },
    { label: "Experience", path: "/experience" },
    { label: "Contact", path: "/#contact" },
  ],
  showCompanyLogos: true, // allowed per prompt
  theme: {
    mode: "dark",
    primary: "#90caf9",
    secondary: "#80cbc4",
  },
  ctaText: "Hire me",
};
