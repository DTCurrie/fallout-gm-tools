import Head from "next/head";
import { EncounterTracker } from "./EncounterTracker";
import EncounterTrackerStateProvider from "./EncounterTrackerStateProvider";

export default function Home() {
  return (
    <>
      <Head>
        <title>EncounterTracker</title>
        <meta name="description" content="Fallout RPG Scavenging Calculator" />

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/default.min.css"
          rel="stylesheet"
        />
      </Head>

      <EncounterTrackerStateProvider>
        <EncounterTracker />
      </EncounterTrackerStateProvider>
    </>
  );
}
