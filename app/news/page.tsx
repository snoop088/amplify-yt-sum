"use client";
import { useState } from "react";

import { Schema } from "@/amplify/data/resource";
import { News } from "@/components/news";

import styles from "./page.module.css";
import { generateClient } from "aws-amplify/data";

type NewsItem = Schema["News"]["type"];

const NewsPage = () => {
  const client = generateClient<Schema>();

  const [newsItem, setNewsItem] = useState<Partial<NewsItem>>();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNews();
  };
  async function createNews() {
    const r = await client.models.News.create({ ...newsItem });
    console.log(r);
  }
  return (
    <section className={styles.container}>
      <div className={styles.news}>
        <h3>List of News</h3>
        <News />
      </div>
      <div className={styles.create}>
        <h3>Create News</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input
              required
              type="text"
              name="title"
              value={newsItem?.title ?? ""}
              onChange={(e) =>
                setNewsItem((current) => ({
                  ...current,
                  title: e.target.value,
                }))
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="author">Author</label>
            <input
              required
              type="text"
              name="author"
              value={newsItem?.author ?? ""}
              onChange={(e) =>
                setNewsItem((current) => ({
                  ...current,
                  author: e.target.value,
                }))
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="content">Content</label>
            <input
              required
              type="text"
              name="contet"
              value={newsItem?.content ?? ""}
              onChange={(e) =>
                setNewsItem((current) => ({
                  ...current,
                  content: e.target.value,
                }))
              }
            />
          </div>
          <button type="submit">Create</button>
          <button type="button" onClick={() => setNewsItem({})}>
            Reset
          </button>
        </form>
      </div>
    </section>
  );
};
export default NewsPage;
