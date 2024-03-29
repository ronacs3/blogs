import Head from "next/head";
import styles from "@/styles/Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";
import { UserProvider } from "lib/authContext";

export default function Layout({ title, keyowrds, description, children, user, loading = false, }) {
  return (
      <UserProvider value={{ user, loading }}>
      <Head>
        <title>{title}</title>
        <meta name="descriptions" content={description} />
        <meta name="keywords" content={keyowrds} />
      </Head>
      <Header />
      {/* {router.pathname === "/" && <Hero />} */}
      <div>{children}</div>
      <Footer />
      </UserProvider>

  );
}

Layout.defaultProps = {
  title: "W News | Find Latest News",
  description: "A Website that brings you latest news",
  keyowrds: "",
};
