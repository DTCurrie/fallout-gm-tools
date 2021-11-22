import { forwardRef } from "react";
import Link from "next/link";

export default function Header() {
  // eslint-disable-next-line react/display-name
  const Brand = forwardRef(({ onClick, href }, ref) => {
    return (
      <a className="navbar-brand" href={href} onClick={onClick} ref={ref}>
        Fallout GM Tools
      </a>
    );
  });

  return (
    <header>
      <nav
        id="top-nav"
        className="navbar navbar-expand-lg navbar-dark bg-primary shadow"
      >
        <div className="container-fluid">
          <Link href="/" passHref>
            <Brand />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#top-nav-collapse"
            aria-controls="top-nav-collapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="top-nav-collapse">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/scavenging-location-calculator">
                  Scavenging Location Calculator
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/encounter-tracker">
                  Encounter Tracker
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
