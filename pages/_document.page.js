import Document, { Html, Head, Main, NextScript } from "next/document";

export default class FalloutGmToolsDocument extends Document {
  render() {
    return (
      <Html lang="en" className="h-100">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="h-100">
          <Main />
          <NextScript />

          <script
            async
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossOrigin="anonymous"
          ></script>

          <script
            async
            crossOrigin="anonymous"
            src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js"
          ></script>
        </body>
      </Html>
    );
  }
}
