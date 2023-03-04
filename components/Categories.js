import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/NewsItem.module.css";
import { useRouter } from "next/router";
export default function Categories({ views }) {
  return (

    <div className={styles.news2}>
      {/* <div className={styles.img}>
        <Image
          src={news.image ? news.image : "No Image"}
          width={150}
          height={100}
        />
      </div> */}
      {/* <div className={styles.img}>
        <Image
        loader={myLoader}
        width={150} height={100}
        src={news.data.attributes.cover.data.attributes.url}
        alt={news.data.attributes.title}
        />
        </div> */}
      <div className={styles.info2}>
        <span>
        </span>
        <h3 className='font-bold font-mono'>{views.attributes.title}</h3>
      </div>
      <div className={styles.link2}>
        <Link href={`the-loai/${views.attributes.slug}`}>
          <div className="btn">Views More</div>
        </Link>
      </div>
    </div>
  );
}
