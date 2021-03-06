import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main id="main" role="main" className="flex-shrink-0 pt-3 mb-3">
        <div className="container">{children}</div>
      </main>

      <footer className="footer mt-auto p-3 bg-light">
        Created By{" "}
        <a
          href="https://github.com/DTCurrie"
          target="_blank"
          rel="noopener noreferrer"
        >
          Devin T. Currie
        </a>
      </footer>
    </>
  );
}
