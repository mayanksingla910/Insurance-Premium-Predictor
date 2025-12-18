import { DialogClose, DialogTitle } from "./ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { createRipple } from "./ui/createRippple";
import { Button } from "./ui/button";

const CalculateBmiModel = ({
  handleBmiCalculation,
}: {
  handleBmiCalculation: (bmi: number) => void;
}) => {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [bmi, setBmi] = useState<number | null>(null);

  const [weightMetric, setWeightMetric] = useState(70);
  const [heightMetric, setHeightMetric] = useState(175);

  const [weightImperial, setWeightImperial] = useState(154);
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(9);

  const handleUnitChange = (newUnit: "metric" | "imperial") => {
    if (newUnit === unit) return;
    if (newUnit === "imperial") {
      const newWeight = weightMetric * 2.20462;
      setWeightImperial(Math.round(newWeight));

      const totalInches = heightMetric / 2.54;
      const newFeet = Math.floor(totalInches / 12);
      const newInches = Math.round(totalInches % 12);

      setFeet(newFeet);
      setInches(newInches);
    } else {
      const newWeight = weightImperial / 2.20462;
      setWeightMetric(Math.round(newWeight));

      const totalInches = feet * 12 + inches;
      const newHeight = totalInches * 2.54;
      setHeightMetric(Math.round(newHeight));
    }

    setUnit(newUnit);
  };

  useEffect(() => {
    let calculatedBmi = 0;
    if (unit === "metric") {
      if (heightMetric > 0 && weightMetric > 0) {
        const heightInMeters = heightMetric / 100;
        calculatedBmi = weightMetric / (heightInMeters * heightInMeters);
      }
    } else {
      const totalInches = feet * 12 + inches;
      if (totalInches > 0 && weightImperial > 0) {
        calculatedBmi = (703 * weightImperial) / (totalInches * totalInches);
      }
    }
    setBmi(calculatedBmi > 0 ? Number(calculatedBmi.toFixed(1)) : null);
  }, [unit, weightMetric, heightMetric, weightImperial, feet, inches]);

  return (
    <div>
      <DialogTitle>Calculate BMI</DialogTitle>
      <div className="my-4 space-y-4">
        <div className="relative grid grid-cols-2 font-semibold text-md text-primary cursor-pointer overflow-hidden rounded-md bg-muted/20">
          <div
            onClick={(e) => {
              createRipple(e);
              handleUnitChange("metric");
            }}
            className="col-span-1 p-3 text-center items-center ripple-container z-10"
          >
            Metric
          </div>
          <div
            onClick={(e) => {
              createRipple(e);
              handleUnitChange("imperial");
            }}
            className="col-span-1 p-3 text-center items-center ripple-container z-10"
          >
            Imperial
          </div>

          <div
            className={`absolute top-0 bottom-0 w-1/2 bg-primary/10 transition-transform duration-200 ease-out ${
              unit === "metric" ? "translate-x-0" : "translate-x-full"
            }`}
          />
          <div
            className={`absolute bottom-0 left-0 h-1 w-1/2 bg-primary transform transition-transform duration-200 ease-out ${
              unit === "metric" ? "translate-x-0" : "translate-x-full"
            }`}
          />
        </div>

        <div>
          <label htmlFor="weight" className="font-medium">
            Weight
          </label>
          <div className="w-full mt-2 relative">
            <Input
              required
              type="number"
              placeholder="0"
              value={(unit === "metric" ? weightMetric : weightImperial) || ""}
              onChange={(e) =>
                unit === "metric"
                  ? setWeightMetric(Number(e.target.value))
                  : setWeightImperial(Number(e.target.value))
              }
              className="border-border pr-8"
            />
            <p className="absolute top-2.5 right-3 text-sm text-muted-foreground font-semibold">
              {unit === "metric" ? "kg" : "lb"}
            </p>
          </div>
        </div>

        <div>
          <label htmlFor="height" className="font-medium">
            Height
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div
              className={`mt-2 relative ${
                unit === "metric" ? "col-span-2" : "col-span-1"
              }`}
            >
              <Input
                required
                type="number"
                placeholder="0"
                value={(unit === "metric" ? heightMetric : feet) || ""}
                onChange={(e) =>
                  unit === "metric"
                    ? setHeightMetric(Number(e.target.value))
                    : setFeet(Number(e.target.value))
                }
                className="border-border pr-8"
              />
              <p className="absolute top-2.5 right-3 text-sm text-muted-foreground font-semibold">
                {unit === "metric" ? "cm" : "ft"}
              </p>
            </div>
            {unit === "imperial" && (
              <div className={`mt-2 relative col-span-1`}>
                <Input
                  required
                  type="number"
                  placeholder="0"
                  value={inches || ""}
                  onChange={(e) => setInches(Number(e.target.value))}
                  className="border-border pr-8"
                />
                <p className="absolute top-2.5 right-3 text-sm text-muted-foreground font-semibold">
                  in
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto my-3 text-center font-semibold h-8">
        {bmi ? (
          <p className="animate-in fade-in zoom-in text-lg text-primary">
            Your BMI is: <span className="font-bold">{bmi}</span>
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">
            Enter your details to see result
          </p>
        )}
      </div>
      <DialogClose asChild>
        <Button
          onClick={() => {
            handleBmiCalculation(bmi as number);
          }}
          disabled={!bmi}
          className="w-full"
        >
          Save
        </Button>
      </DialogClose>
    </div>
  );
};

export default CalculateBmiModel;
