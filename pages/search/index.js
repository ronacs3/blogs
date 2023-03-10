import Layout from "@/components/Layout";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { InstantSearch, SearchBox, Hits, Configure } from "react-instantsearch-dom";
import styles from "@/styles/Layout.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const searchClient = instantMeiliSearch(
  "https://search.v2.wuys.me/",
  "masterKey"
);
const myLoader = ({ src }) => {
  // if (src == null) { return " "}
  // else{
    return `https://v2.wuys.me${src}`
  // }
}
export default function search(){
  // const [hasResults, setHasResults] = useState(true);

  // const handleSearchStateChange = (searchState) => {
  //   const query = searchState?.query?.[0]?.trim() || '';
  //   setHasResults(query === '' || searchState?.results?.hits?.length === 0);
  // };
  return(
    <Layout>
      <div className={styles.container}>
        <InstantSearch
         indexName="post" 
         searchClient={searchClient}
        //  onSearchStateChange={handleSearchStateChange}
         >
          <div className={styles.search}>
            <SearchBox
            translations={{
              placeholder: 'Search news…',
            }}
             />
          </div>
      
            <Hits hitComponent={Hit} />
             
        
            <Configure hitsPerPage={4}/>
        </InstantSearch>

    </div>
    </Layout>
  );
}

function Hit(props){
  return(
      <div className={styles.news}>
        {props.hit.cover != null && (
        <div className={styles.img}>
        <Image
        loader={myLoader}
        width={230} height={180}
        src={props.hit.cover.url}
        alt={props.hit.title}
        />
        </div>
      )}
        {/* {props.hit.cover.url} */}
      
      <div className={styles.info}>
        <h3 className='font-bold text-lg font-mono'>
          {props.hit.title}
        </h3>
      
        <h4>{props.hit.description}</h4>
        <h6>Views:{props.hit.views}</h6>
        <h6>Date: {new Date(props.hit.createdAt).toLocaleString()}</h6>
      </div>
      <div className={styles.link}>
        <Link href={`/${props.hit.slug}`}>
          <div className="btn">Read More</div>
        </Link>
      </div>
      </div>
  );
}
