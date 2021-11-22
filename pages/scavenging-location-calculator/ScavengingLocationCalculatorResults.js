import { useEffect } from "react";
import { sentenceCase } from "sentence-case";

import { useScavengingLocationCalculatorStateContext } from "./ScavengingLocationCalculatorStateProvider";
import useDegreeOfSearch from "./use-degree-of-search";

const trimTableText = (text) => text.trim().replace("\t", "");

export default function ScavengingLocationCalculatorResults() {
  const { location, items, level, markdown, reductions, setMarkdown } =
    useScavengingLocationCalculatorStateContext();

  const degreeOfSearch = useDegreeOfSearch(location?.degree);

  useEffect(() => setTimeout(hljs.highlightAll, 0), []);

  useEffect(() => {
    if (items) {
      const headers = ["Category", "Minimum", "Maximum"];

      const longestCategory = Object.keys(items).sort(
        (a, b) => b.length - a.length
      )[0].length;

      const categoryLength =
        longestCategory > headers[0].length
          ? longestCategory
          : headers[0].length;

      const rowText = Object.keys(items).reduce((acc, cur) => {
        const { min, max } = items[cur];
        const text = sentenceCase(trimTableText(cur));
        const minLength = `${min}`.length;
        const maxLength = `${max}`.length;

        if (cur.length > categoryLength) {
          categoryLength = cur.length;
        }

        const category = `${sentenceCase(trimTableText(cur))}${[
          ...Array(categoryLength - text.length),
        ]
          .map(() => " ")
          .join("")}`;

        const minimum = `${min}${[...Array(headers[1].length - minLength)]
          .map(() => " ")
          .join("")}`;

        const maximum = `${max}${[...Array(headers[2].length - maxLength)]
          .map(() => " ")
          .join("")}`;

        return (acc += `| ${category} | ${minimum} | ${maximum} |\n`);
      }, "");

      const headerText = headers.reduce((acc, cur, i) => {
        const text = trimTableText(cur);
        acc += ` ${text}${
          i === 0
            ? [...Array(categoryLength - text.length)].map(() => " ").join("")
            : ""
        } |`;
        return acc;
      }, "|");

      const divider = `| ${[...Array(categoryLength)]
        .map(() => "-")
        .join("")} | ${[...Array(headers[1].length)]
        .map(() => "-")
        .join("")} | ${[...Array(headers[2].length)]
        .map(() => "-")
        .join("")} |`;

      setMarkdown(`${headerText}\n${divider}\n${rowText}`);
    }
  }, [items, setMarkdown]);

  if (!location || reductions > 0 || level === null || !degreeOfSearch) {
    return null;
  }

  return (
    <>
      <h2>Results</h2>
      <p>Here is the summary for your scavenging location.</p>

      <h3>Location</h3>
      <ul className="list-group list-group-horizontal-lg my-3 text-center">
        {[
          {
            label: "Location Scale",
            value: sentenceCase(location.scale),
          },
          {
            label: "Location Category",
            value: sentenceCase(location.category),
          },
          {
            label: "Degree of Search",
            value: (
              <>
                {sentenceCase(location.degree)} <br />
                <small className="text-muted">
                  (difficulty {location.degreeOfSearchValue.difficulty})
                </small>
              </>
            ),
          },
          {
            label: "Location Level",
            value: level,
          },
          {
            label: "Time to Search",
            value: `${degreeOfSearch.timeToSearch} minutes`,
          },
        ].map(({ label, value }) => (
          <li
            key={label.split(" ").join("")}
            className="list-group-item d-flex flex-column w-100 bg-transparent"
          >
            <h4 className="mb-1">{label}</h4>
            <p className="mb-1">{value}</p>
          </li>
        ))}
      </ul>

      <h3>Items</h3>
      <table
        id="resultsItems"
        className="table table-borderless table-striped table-hover"
      >
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Minimum</th>
            <th scope="col">Maximum</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(items).map((key) => {
            const { min, max } = items[key];

            return (
              <tr key={key}>
                <td>{sentenceCase(key)}</td>
                <td>{min}</td>
                <td>{max}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h3>Markdown</h3>
      <pre className="d-flex align-items-center justify-content-center">
        {/* prettier-ignore */}
        <code className="language-markdown w-100">
                # Location{`\n`}
                {`\n`}
                - Scale: {sentenceCase(location.scale)}{`\n`}
                - Category: {sentenceCase(location.category)}{`\n`}
                - Degree of Search: {sentenceCase(location.degree)}{`\n`}
                - Difficulty: {sentenceCase(location.degree)} (difficulty {location.degreeOfSearchValue.difficulty}){`\n`}
                - Time to Search: {degreeOfSearch.timeToSearch} minutes{`\n`}
                {`\n`}
                ## Items{`\n`}
                {markdown}
                </code>
        {/* prettier-ignore-end */}
      </pre>
    </>
  );
}
