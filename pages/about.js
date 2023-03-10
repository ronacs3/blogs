import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/Layout.module.css";
export default function About() {
  return (
    <div>
      <Layout title="About News">
        <div className={styles.container}>
          <h1 className="text-xl">About</h1>
          <p>
            App to find out News in the World
          </p>
        </div>
      </Layout>
    </div>
  );
}
