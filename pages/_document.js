import Document, { Html, Head, Main, NextScript } from "next/document";

export default class FalloutGmToolsDocument extends Document {
  render() {
    return (
      <Html lang="en" className="h-100">
        <Head>
          <link rel="icon" href="/favicon.ico" />

          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
            crossOrigin="anonymous"
          />

          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/default.min.css"
            rel="stylesheet"
          />
        </Head>
        <body className="h-100">
          <Main />
          <NextScript />

          <script
            async
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
            integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
            crossOrigin="anonymous"
          ></script>

          <script
            async
            src="https://unpkg.com/mathjs@9.3.2/lib/browser/math.js"
          ></script>

          <script
            async
            src="https://cdn.jsdelivr.net/npm/random-js@2.1.0/dist/random-js.umd.min.js"
          ></script>

          <script
            async
            src="https://cdn.jsdelivr.net/npm/rpg-dice-roller@5.0.0/lib/umd/bundle.min.js"
          ></script>

          <script
            async
            src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js"
          ></script>
        </body>
      </Html>
    );
  }
}
