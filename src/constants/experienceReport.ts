export type Experience = {
  company: string;
  title: string;
  logo?: string;
  start: string;
  end: string;
  bullets: string[];
  tech: string[];
};

export const experience: Experience[] = [
  {
    company: "FarEye",
    title: "Software Engineer II",
    start: "May 2022",
    end: "Current",
    bullets: [
      "Built reporting service handling 63M-row reports in ~5 minutes using React + Spring Boot, Spark, and Redshift.",
      "Cut S3 spend by ~$36k/year through storage class tuning and access pattern changes.",
    ],
    tech: ["React", "Java", "Spring Boot", "Spark", "Redshift", "AWS"],
  },
  {
    company: "FICO",
    title: "Software Engineer I",
    start: "June 2020",
    end: "April 2022",
    bullets: [
      "Developed on‑prem dashboard for multi‑cluster Kubernetes status and DMP health metrics.",
      "Created Python log processor to identify bottlenecks and improve throughput.",
      "Automated cert injection with Docker SDK; integrated Helm charts for monitoring stack.",
    ],
    tech: ["Python", "React", "Kubernetes", "Prometheus", "Grafana", "Helm"],
  },
  {
    company: "FICO",
    title: "Software Engineer Intern",
    start: "Sep 2019",
    end: "June 2020",
    bullets: [
      "Deployed Ignite provider via Helm and automated testing in Python.",
      "Built dmpctl CLI for solution/component lifecycle.",
      "Automated performance testing and reporting for batch and ignite.",
    ],
    tech: ["Python", "Helm", "Kubernetes"],
  },
  {
    company: "HighRadius",
    title: "Software Engineer Intern",
    start: "May 2019",
    end: "Sep 2019",
    bullets: ["Contributed to production‑ready B2B fintech web app in React."],
    tech: ["React"],
  },
];
