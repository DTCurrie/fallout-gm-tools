import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Fallout GM Tools</title>
        <meta
          name="description"
          content="GM Tools for running Fallout: The Roleplaying Game"
        />
      </Head>

      <h1>Fallout GM Tools</h1>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col d-flex">
          <button
            className="card bg-white shadow"
            onClick={(e) => {
              e.preventDefault();
              router.push("/scavenging-location-calculator", undefined, {
                shallow: true,
              });
            }}
            aria-label="Scavenging Location Calculator"
          >
            <div className="card-body">
              <h5 className="card-title">Scavenging Location Calculator</h5>
              <p className="card-text">
                Use this calculator to determine scavenging item minimums and
                maximums and location levels.
              </p>
            </div>
          </button>
        </div>

        <div className="col d-flex">
          <button
            className="card bg-white shadow"
            onClick={(e) => {
              e.preventDefault();
              router.push("/encounter-tracker", undefined, {
                shallow: true,
              });
            }}
            aria-label="Encounter Tracker"
          >
            <div className="card-body">
              <h5 className="card-title">Encounter Tracker</h5>
              <p className="card-text">
                Use this tracker to manage combat encounters between players and
                NPCs.
              </p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
