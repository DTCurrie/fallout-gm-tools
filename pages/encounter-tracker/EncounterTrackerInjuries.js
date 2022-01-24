import { useEncounterTrackerStateContext } from "./EncounterTrackerStateProvider";

export default function EncounterTrackerInjuries({ id, injuries }) {
  const { editActor } = useEncounterTrackerStateContext();

  const { head, leftArm, leftLeg, rightArm, rightLeg, torso } = injuries;

  return (
    <div className="encounter-tracker-injuries mx-lg-auto px-2">
      <div className="mb-1 text-center">Injuries</div>
      <div className="encounter-tracker-injuries__inputs d-flex flex-row flex-wrap">
        <div className="form-check form-switch me-3">
          <label className="form-check-label" htmlFor={`${id}HeadCheckbox`}>
            <small className="encounter-tracker-injuries__label text-muted">
              Head
            </small>
            <input
              id={`${id}_HeadCheckbox`}
              className="form-check-input"
              type="checkbox"
              checked={head}
              onChange={(e) =>
                editActor(id, {
                  injuries: { ...injuries, head: e.target.checked },
                })
              }
            />
          </label>
        </div>
        <div className="form-check form-switch me-3">
          <label className="form-check-label" htmlFor={`${id}TorsoCheckbox`}>
            <small className="encounter-tracker-injuries__label text-muted">
              Torso
            </small>
            <input
              id={`${id}_TorsoCheckbox`}
              className="form-check-input"
              type="checkbox"
              checked={torso}
              onChange={(e) =>
                editActor(id, {
                  injuries: { ...injuries, torso: e.target.checked },
                })
              }
            />
          </label>
        </div>
        <div className="form-check form-switch me-3">
          <label className="form-check-label" htmlFor={`${id}LeftArmCheckbox`}>
            <small className="encounter-tracker-injuries__label text-muted">
              Left Arm
            </small>
            <input
              id={`${id}_LeftArmCheckbox`}
              className="form-check-input"
              type="checkbox"
              checked={leftArm}
              onChange={(e) =>
                editActor(id, {
                  injuries: { ...injuries, leftArm: e.target.checked },
                })
              }
            />
          </label>
        </div>
        <div className="form-check form-switch me-3">
          <label className="form-check-label" htmlFor={`${id}RightArmCheckbox`}>
            <small className="encounter-tracker-injuries__label text-muted">
              Right Arm
            </small>
            <input
              id={`${id}_RightArmCheckbox`}
              className="form-check-input"
              type="checkbox"
              checked={rightArm}
              onChange={(e) =>
                editActor(id, {
                  injuries: { ...injuries, rightArm: e.target.checked },
                })
              }
            />
          </label>
        </div>
        <div className="form-check form-switch me-3">
          <label className="form-check-label" htmlFor={`${id}LeftLegCheckbox`}>
            <small className="encounter-tracker-injuries__label text-muted">
              Left Leg
            </small>
            <input
              id={`${id}_LeftLegCheckbox`}
              className="form-check-input"
              type="checkbox"
              checked={leftLeg}
              onChange={(e) =>
                editActor(id, {
                  injuries: { ...injuries, leftLeg: e.target.checked },
                })
              }
            />
          </label>
        </div>
        <div className="form-check form-switch me-3">
          <label className="form-check-label" htmlFor={`${id}RightLegCheckbox`}>
            <small className="encounter-tracker-injuries__label text-muted">
              Right Leg
            </small>
            <input
              id={`${id}_RightLegCheckbox`}
              className="form-check-input"
              type="checkbox"
              checked={rightLeg}
              onChange={(e) =>
                editActor(id, {
                  injuries: { ...injuries, rightLeg: e.target.checked },
                })
              }
            />
          </label>
        </div>
      </div>
    </div>
  );
}
