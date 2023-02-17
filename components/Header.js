import Link from "next/link";
import styles from "@/styles/Header.module.css";
export default function Header({}) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          W News
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/about">
           About
            </Link>
          </li>
          <li>
            <Link href="/the-loai">
            Thể Loại
            </Link>
          </li>
          <li>
          </li>
        </ul>
      </nav>
    </header>
  );
}