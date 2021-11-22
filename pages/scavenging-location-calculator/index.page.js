import Head from "next/head";

import ScavengingLocationCalculator from "./ScavengingLocationCalculator";

import ScavengingLocationCalculatorStateProvider from "./ScavengingLocationCalculatorStateProvider";

export default function Home() {
  return (
    <>
      <Head>
        <title>Scavenging Location Calculator</title>
        <meta name="description" content="Fallout RPG Scavenging Calculator" />

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/default.min.css"
          rel="stylesheet"
        />
      </Head>

      <ScavengingLocationCalculatorStateProvider>
        <ScavengingLocationCalculator />
      </ScavengingLocationCalculatorStateProvider>
    </>
  );
}
