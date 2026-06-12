export interface Service {
  id: string;
  title: string;
  description: string;
  /** SVG path data, rendered at 24×24 with a 1.5px lime stroke */
  icon: string;
}

export const services: Service[] = [
  {
    id: "web",
    title: "Web Development",
    description:
      "Modern websites & web apps. Fast, accessible, built to scale — from landing pages to full products.",
    icon: "M8 6l-5 6 5 6M16 6l5 6-5 6M13 4l-2 16",
  },
  {
    id: "security",
    title: "Cybersecurity",
    description:
      "Secure-by-design builds, audits and hardening. We attack our own work before anyone else can.",
    icon: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z M9 12l2 2 4-4",
  },
  {
    id: "systems",
    title: "Custom Systems",
    description:
      "Dashboards, internal tools and automation that remove busywork and surface the numbers that matter.",
    icon: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M17.5 14v7 M14 17.5h7",
  },
  {
    id: "design",
    title: "UI/UX & Branding",
    description:
      "Identity and interfaces that convert. Design is not decoration — it's how the product argues for itself.",
    icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 3a9 9 0 0 1 0 18 M7 12h10",
  },
];
