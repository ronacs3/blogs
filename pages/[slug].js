import Layout from "../components/Layout";
import Link from "next/link";
import styles from "@/styles/News.module.css";
import MarkdownIt from 'markdown-it';
import * as React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DiscussionEmbed } from "disqus-react";
import { useFetchUser } from "lib/authContext";
const News = ({news}) => {
  console.log(news)
  let md = new MarkdownIt();
let renderContent = md.render(news.attributes.content);
  // const router = useRouter()
  // const {id} = router.query
  // console.log(id)
  console.log(news)
  const { user, loading } = useFetchUser();
  return(
    <Layout user={user}>
      <div className={styles.container}>
      <div className={styles.news}>
        <h1 className="text-xl">{news.attributes.title}</h1>
        <h1><VisibilityIcon/> {news.attributes.views}</h1>
        <h1><AccessTimeIcon/> {new Date(news.attributes.createdAt).toLocaleString()}</h1>
        <div dangerouslySetInnerHTML={{ __html: renderContent }} />
        <Link href="/hotnews">
          <a className={styles.back}>Go Back</a>
        </Link>

        <div className="comment">
        <DiscussionEmbed
          shortname='quangdemo'
          config={
        {
            // url: `http://localhost:3000/${news.attributes.slug}`,
            identifier: news.attributes.slug,
            title: news.attributes.title,
            language: 'vi_VN' //e.g. for Traditional Chinese (Taiwan)	
        }
    }
/>
        </div>
      </div>
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
