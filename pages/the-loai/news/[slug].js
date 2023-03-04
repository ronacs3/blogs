import Layout from "../../../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from 'axios';
import styles from "@/styles/News.module.css";
import { Router } from "react-router-dom";
import Image from 'next/image'
import MarkdownIt from 'markdown-it';
import Icon from '@mui/material/Icon';
import * as React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


const News = ({news}) => {
  console.log(news)
  let md = new MarkdownIt();
let renderContent = md.render(news.attributes.content);
  // const router = useRouter()
  // const {id} = router.query
  // console.log(id)
  console.log(news)
  return(
    <Layout>
      <div className={styles.news}>
        <h1 className="text-xl">{news.attributes.title}</h1>
        <h1><VisibilityIcon/> {news.attributes.views}</h1>
        <h1><AccessTimeIcon/> {new Date(news.attributes.createdAt).toLocaleString()}</h1>
        <div dangerouslySetInnerHTML={{ __html: renderContent }} />
        {/* <Image
        loader={myLoader}
        width={1000} height={700}
        size={22.03}
        src={news.data.attributes.cover.data.attributes.url}
        alt={news.data.attributes.title}
        /> */}
        {/* <h4>{news.data.attributes.content}</h4> */}
      
        {/* <span>{news.attributes.categories}</span> */}
        <Link href="/the-loai">
          <a className={styles.back}>Go Back</a>
        </Link>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const {slug} = context.query
  const res = await fetch(`https://v2.wuys.me/api/posts/${slug}?populate=*`)
  const data = await res.json()
  return {
      props: {
          news: data.data
      },
  }
}
// export async function getSideProps(context) {
//   const {id} = context.query
//   const api = await fetch(`https://api.wuys.me/api/categories/${id}?populate=*`)
//   const img = await api.json()
//   return {
//       props: {
//           Image: img
//       },
//   }
// }

export default News;

// export async function getStaticPaths() {
//   const res = await fetch(`https://api.wuys.me/api/posts`);
//   const news = await res.json();
//   const paths = news.data.map((item) => ({
//     params: { id: item.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params: { id } }) {
//   const res = await fetch(`https://api.wuys.me/api/posts/${id}`);
//   const news = await res.json(); 
//   return {
//     props: {
//       news: news,
//     },
//     revalidate: 1,
//   };
// }
