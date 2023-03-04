import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/Layout.module.css";
import NewsItem from "@/components/NewsItem";
import Categories from "@/components/Categories";

export default function Homepages ({views}) {
  return (

      <Layout>
      <div className={styles.container}>
        <div className='font-bold text-xl font-mono'>Thể Loại</div>
        {views.length === 0 && <h3>No News</h3>}
        {views.map((item) => (
          <Categories key={item.id} views={item} />
        ))}
    </div>
       
      </Layout>
  );
}



// export async function getServerSideProps() {
//   const res = await fetch(`${API_URL}/api/news`);
//   const news = await res.json();

//   return {
//     props: { news },
//   };
// }


export async function getStaticProps() {
  const res = await fetch(`https://v2.wuys.me/api/categories`);
  const data = await res.json();

  return {
    props: {views:data.data},
  };
}