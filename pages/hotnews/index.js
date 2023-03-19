
import Layout from "@/components/Layout";
import NewsItem from "@/components/NewsItem";
import { useState } from "react";
import { paginate } from "@/components/paginate";
import useSWR from 'swr';
import styles from "@/styles/Layout.module.css";
import { fetcher } from "lib/api";
import { useFetchUser } from "lib/authContext";
export default function Homepages ({news}) {
  const [pageIndex, setPageIndex] = useState(1);
  const { data } = useSWR(
    `https://v2.wuys.me/api/posts?pagination[page]=${pageIndex}&pagination[pageSize]=3&populate=*&sort=views%3Adesc`,
    fetcher,
    {
      fallbackData: news,
    }
  );
    // const newsList = [ninja]
    // console.log(newsList)
    
    // const paginatedPosts = paginate(ninja, currentPage, pageSize);
// console.log(data)
  const { user, loading } = useFetchUser();
  return (
      <Layout user={user}>
      <div className={styles.container}>
        <h1 className='font-bold text-xl font-mono'>Hot News</h1>
        {/* {ninja.length === 0 && <h3>No News</h3>} */}
        {data.data.map((item) => (
          <NewsItem key={item.id} news={item} />
        ))}
      
      
        <div className="space-x-2 space-y-2">
        <button
          className={`md:p-2 rounded py-2 text-black text-white p-3 ${
            pageIndex === 1 ? 'bg-gray-300' : 'bg-blue-400'
          }`}
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          {' '}
          Previous
        </button>
        <button
          className={`md:p-2 rounded py-2 text-black text-white p-3 ${
            pageIndex === (data && data.meta.pagination.pageCount)
              ? 'bg-gray-300'
              : 'bg-blue-400'
          }`}
          disabled={pageIndex === (data && data.meta.pagination.pageCount)}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </button>
        <span>{`${pageIndex} of ${
          data && data.meta.pagination.pageCount
        }`}</span>
      </div>
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
  const newsResponse = await fetcher(
    `https://v2.wuys.me/api/posts?pagination[page]=1&pagination[pageSize]=3&populate=*&sort=views%3Adesc`
  );
  return {
    props: {
      news: newsResponse,
    },
  };
}

// export async function getStaticProps() {

//   const res = await fetch(`https://v2.wuys.me/api/posts?pagination[page]=2&pagination[pageSize]=2&populate=*`);
//   const data = await res.json();

//   return {
//     props: {ninja:data.data },
//     revalidate: 1,
//   };
// }
