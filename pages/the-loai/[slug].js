import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Newcate from "@/components/Newcate";
import styles from "@/styles/News.module.css";
export default function Homepages ({news}) {

  return (
    <div>
      <Layout>
        <h1>{news.attributes.title}</h1>
        {news.attributes.posts.data.length === 0 && <h3>No News</h3>}
        {news.attributes.posts.data.map((item) => (
          <Newcate key={item.id} news={item} />
        ))}
        <Link href="/the-loai">
          <a className={styles.back}>Go Back</a>
        </Link>
      </Layout>
    </div>
  );
}






export async function getServerSideProps(context) {
  const {slug} = context.query
  const res = await fetch(`https://v2.wuys.me/api/categories/${slug}?populate=*`)
  const data = await res.json()
  return {
      props: {
          news: data.data
      },
  }
}