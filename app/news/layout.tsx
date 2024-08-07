import type { Metadata } from "next";

import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "News",
  description: "Another Next.js page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles.container}>
      <h1>News Page</h1>
      {children}
    </section>
  );
}
