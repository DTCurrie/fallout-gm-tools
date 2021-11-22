import Layout from "../components/Layout";

import "../styles/globals.scss";

function FalloutGmTools({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default FalloutGmTools;
