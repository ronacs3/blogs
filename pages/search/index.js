import Layout from "@/components/Layout";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { InstantSearch, SearchBox, Hits, Highlight, Configure } from "react-instantsearch-dom";
import styles from "@/styles/Layout.module.css";
import Image from "next/image";
import Link from "next/link";
const searchClient = instantMeiliSearch(
  "https://search.v2.wuys.me/",
  "f7ae180757df61429028a274c637b1ff5fed62a81f53b5e5b54d49d44213c89a"
);
const myLoader = ({ src }) => {
  // if (src == null) { return " "}
  // else{
    return `https://v2.wuys.me${src}`
  // }
}

export default function search(){
  return(
    <Layout>
      <div className={styles.container}>
      <InstantSearch
       indexName= "post"
       searchClient={searchClient}>
        <div>
          <SearchBox/>

          <Hits hitComponent={Hit}/>
          <Configure hitsPerPage={5}/>
        </div>
      </InstantSearch>
    </div>
    </Layout>
  );
}

function Hit(props){
  console.log(props)
  return(
      <div className={styles.news}>
        <div className={styles.img}>
          {/* <Image
          loader={myLoader}
          width={230} height={180}
          src={props.hit.cover.url}
          alt={props.hit.title}
        /> */}
        {/* {props.hit.cover.url} */}
        </div>
      <div className={styles.info}>
        <h3 className='font-bold text-lg font-mono'>
          {props.hit.title}
        </h3>
      
        <h4>{props.hit.description}</h4>
        <h6>Views:{props.hit.views}</h6>
        <h6>Date: {new Date(props.hit.createdAt).toLocaleString()}</h6>
      </div>
      <div className={styles.link}>
        <Link href={`the-loai/news/${props.hit.slug}`}>
          <div className="btn">Read More</div>
        </Link>
      </div>
      </div>
  );
}
