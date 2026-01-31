import Head from "next/head";
import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Social Network</title>
        <meta name="description" content="A modern social network application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Social Network</h1>
          <p className={styles.description}>
            Connect, share, and engage with your community
          </p>
        </div>
        <footer className={styles.footer}>
          <a
            href="https://github.com/leomark-sio"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made with ❤️ by Leo Mark
          </a>
        </footer>
      </main>
    </>
  );
}
