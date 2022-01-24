import { capitalCase } from "capital-case";
import { sentenceCase } from "sentence-case";

const renderResistances = (res) => {
  if (res.immune) {
    return "Immune";
  }

  const resMap = Object.keys(res).reduce((map, key) => {
    if (key === "immune") {
      return map;
    }

    const value = res[key];

    if (value === 0) {
      return map;
    }

    const capitalized = capitalCase(key);

    if (map[value]) {
      map[value].push(capitalized);
    } else {
      map[value] = [capitalized];
    }

    return map;
  }, {});

  return (
    Object.keys(resMap).reduce((str, key) => {
      return str + `${!!str ? "; " : ""} ${key} (${resMap[key].join(", ")})`;
    }, "") || "0"
  );
};

export default function StatBlock({
  name,
  level,
  type,
  keywords,
  category,
  importance,
  xp,
  special: { STR, PER, END, CHA, INT, AGI, LUCK },
  skills,
  hp,
  maxHp,
  initiative,
  defense,
  carryWeight,
  meleeBonus,
  luckPoints,
  injuries,
  damageResistance: { physical, energy, radiation, poison },
  attacks,
  abilities,
  inventory,
}) {
  return (
    <div className="stat-block">
      <h5>{name}</h5>
      <p className="fw-bold">
        Level {level}, {capitalCase(type)}, {capitalCase(importance)} Character
        ({xp} XP)
      </p>

      <table
        className="table table-borderless table-striped text-center"
        style={{ tableLayout: "fixed" }}
      >
        <thead>
          <tr>
            <th>S</th>
            <th>P</th>
            <th>E</th>
            <th>C</th>
            <th>I</th>
            <th>A</th>
            <th>L</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{STR}</td>
            <td>{PER}</td>
            <td>{END}</td>
            <td>{CHA}</td>
            <td>{INT}</td>
            <td>{AGI}</td>
            <td>{LUCK}</td>
          </tr>
        </tbody>
      </table>

      <table
        className="table table-borderless table-striped"
        style={{ tableLayout: "fixed" }}
      >
        <thead>
          <tr>
            <th className="text-center" colSpan={2}>
              SKILLS
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(skills)
            .filter((key) => skills[key].rating > 0)
            .reduce(
              (array, current) => {
                const currentRow = array[array.length - 1];
                const skill = skills[current];
                if (currentRow.length < 2) {
                  currentRow.push({ key: current, ...skill });
                } else {
                  array.push([{ key: current, ...skill }]);
                }

                return array;
              },
              [[]]
            )
            .flatMap((row, index) => (
              <tr key={index}>
                {row.map((skill, skillIndex) => (
                  <>
                    <td
                      key={`${index}-${skillIndex}`}
                      className={
                        skillIndex === 0 ? "border-end border-dark" : undefined
                      }
                    >
                      <div className="d-flex justify-content-between">
                        <span>
                          {capitalCase(sentenceCase(skill.key))}{" "}
                          {skill.tagged && "■"}
                        </span>
                        <span> {skill.rating}</span>
                      </div>
                    </td>
                    {row.length === 1 && <td />}
                  </>
                ))}
              </tr>
            ))}
          <tr>
            <td className="text-end border-end-0" colSpan={2}>
              (■ Tag Skill)
            </td>
          </tr>
        </tbody>
      </table>

      <table
        className="table table-borderless table-striped text-center"
        style={{ tableLayout: "fixed" }}
      >
        <thead>
          <tr>
            <th>HP</th>
            <th>INITIATIVE</th>
            <th>DEFENSE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{hp}</td>
            <td>{initiative}</td>
            <td>{defense}</td>
          </tr>
        </tbody>
      </table>

      <table
        className="table table-borderless table-striped text-center"
        style={{ tableLayout: "fixed" }}
      >
        <thead>
          <tr>
            <th>CARRY WEIGHT</th>
            <th>MELEE BONUS</th>
            <th>LUCK POINTS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{carryWeight}</td>
            <td>{meleeBonus || "-"}</td>
            <td>{luckPoints || "-"}</td>
          </tr>
        </tbody>
      </table>

      <table
        className="table table-borderless table-striped text-center"
        style={{ tableLayout: "fixed" }}
      >
        <thead>
          <tr>
            <th>PHYSICAL DR</th>
            <th>ENERGY DR</th>
            <th>RAD. DR</th>
            <th>POISON. DR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{renderResistances(physical)}</td>
            <td>{renderResistances(energy)}</td>
            <td>{renderResistances(radiation)}</td>
            <td>{renderResistances(poison)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
