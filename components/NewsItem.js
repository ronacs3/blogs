import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/NewsItem.module.css";
import { useRouter } from "next/router";
const myLoader = ({ src }) => {
  // if (src == null) { return " "}
  // else{
    return `https://v2.wuys.me${src}`
  // }
}

export default function NewsItem({ news }) {
  console.log(news)
  return (
    <div className={styles.news}>
      {news.attributes.cover.data != null && (
        <div className={styles.img}>
        <Image
        loader={myLoader}
        width={230} height={180}
        src={news.attributes.cover.data.attributes.url}
        alt={news.attributes.title}
        />
        </div>
      )}
      {/* <div className={styles.img}>
        <Image
        loader={myLoader}
        width={150} height={100}
        src={news.attributes.cover.data.attributes.url}
        alt={news.attributes.title}
        />
        </div> */}
      <div className={styles.info}>
        <h3>
          {news.attributes.title}
        </h3>
      
        <h4>{news.attributes.description}</h4>
        <h6>Views:{news.attributes.views}</h6>
        <h6>date: {news.attributes.createdAt}</h6>
      </div>
      <div className={styles.link}>
        <Link href={`the-loai/news/${news.attributes.slug}`}>
          <div className="btn">Read More</div>
        </Link>
      </div>
    </div>
  );
}