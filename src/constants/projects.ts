// Add/edit/delete projects by changing this array only.

export type Project = {
  slug: string;
  title: string;
  timeframe?: string;
  role?: string;
  overview: string;
  stack: string[];
  highlights: string[]; // measurable outcomes
  links?: { label: string; url: string }[];
  architecture?: string[]; // steps rendered as a diagram
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "reporting-service",
    title: "Reporting Service (Scalable Reports)",
    timeframe: "2022–Current",
    role: "Full‑stack Engineer",
    overview:
      "End-to-end reporting platform generating very large reports rapidly.",
    stack: ["React", "Java Spring Boot", "Redshift", "Spark", "AWS"],
    highlights: [
      "Scaled from ~0.1M rows/30 min to 63M rows/5 min",
      "Lowered S3 costs by $36k/year via storage and access optimizations",
    ],
    links: [{ label: "Placeholder Case Study", url: "#" }],
    architecture: ["User", "React UI", "Spring Boot API", "Kafka", "Spark", "Redshift", "S3", "Dashboard"],
    featured: true,
  },
  {
    slug: "onprem-dashboard",
    title: "On‑prem Kubernetes Dashboard",
    timeframe: "2020–2022",
    role: "Full‑stack Engineer",
    overview:
      "Dynamic, customizable dashboard for status and health of multiple Kubernetes clusters.",
    stack: ["React", "Python", "Kubernetes", "Prometheus", "Grafana"],
    highlights: ["Unified view across clusters", "Integrated alerting via Alertmanager"],
    links: [{ label: "Placeholder Demo", url: "#" }],
    architecture: ["User", "React UI", "Python API", "Prometheus", "Grafana"],
  },
  {
    slug: "college-project",
    title: "Confidentiality‑Preserving Data Storage (College Project)",
    timeframe: "2019–2020",
    role: "Student Developer",
    overview:
      "End‑to‑end app exploring strong/weak confidentiality trade‑offs.",
    stack: ["React", "Spring Boot", "PostgreSQL"],
    highlights: ["Academic prototype; architecture for demonstration only"],
    links: [{ label: "Placeholder Write‑up", url: "#" }],
    architecture: ["Client", "React App", "Spring API", "PostgreSQL"],
  },
];
