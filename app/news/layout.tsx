import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "News",
  description: "Another Next.js page",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <h1>News Page</h1>
      {children}
    </section>
  );
}
