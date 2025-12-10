import { useState } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Slider } from "./ui/slider";
import { Cigarette, Mars } from "lucide-react";
import { Venus } from "lucide-react";
import { Counter } from "./ui/shadcn-io/counter";

const PredictionForm = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    age: 25,
    bmi: 22,
    smoker: false,
    Children: 0,
    region: "northwest",
    gender: "male",
  });

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className=" mt-6">
      <Card className="w-[95%] mx-auto">
        <CardTitle className="text-2xl font-bold mx-10">
          Personal Details
        </CardTitle>
        <div className="border-b border-gray-200 mx-6" />
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-2">
            <div className="col-span-1 p-4">
              <div className="flex justify-between">
                <label htmlFor="name">Age</label>
                <span className="text-primary text-sm font-bold">
                  {formData.age} years
                </span>
              </div>
              <Slider
                onValueChange={(value) => handleChange("age", value[0])}
                defaultValue={[25]}
                min={0}
                max={100}
                className="mt-2 w-full"
              />
              <div className="flex justify-between text-slate-500 text-xs mt-2">
                <span>0</span>
                <span>100</span>
              </div>
            </div>
            <div className="col-span-1 p-4">
              <div className="flex justify-between">
                <label htmlFor="name">BMI</label>
                <span
                  className={`text-sm font-bold ${
                    formData.bmi > 25 ? "text-orange-500" : "text-green-600"
                  }`}
                >
                  {formData.bmi}
                </span>
              </div>
              <Slider
                onValueChange={(value) => handleChange("bmi", value[0])}
                defaultValue={[22]}
                min={10}
                max={50}
                step={0.1}
                className={`mt-2 w-full`}
              />
              <div className="flex justify-between text-slate-500 text-xs mt-2">
                <span>UnderWeight</span>
                <span>Obese</span>
              </div>
            </div>
            <div className="col-span-1 p-4 ">
              <label htmlFor="name">Gender</label>
              <div className="flex bg-slate-100 p-1 rounded-lg mt-2">
                {["male", "female"].map((g) => (
                  <button
                    key={g}
                    onClick={(e) => {
                      e.preventDefault();
                      handleChange("gender", g);
                    }}
                    className={`flex justify-center items-center gap-2 py-2 w-full text-sm font-medium rounded-md capitalize transition-all  ${
                      formData.gender === g
                        ? "bg-white text-primary shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {g === "male" ? <Mars size={16} /> : <Venus size={16} />}{" "}
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                handleChange("smoker", !formData.smoker);
              }}
              className="flex items-center justify-between m-4 h-fit col-span-1 my-auto bg-slate-50 p-4 rounded-lg border border-slate-200"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    formData.smoker
                      ? "bg-red-100 text-red-600"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  <Cigarette className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-medium text-slate-900">
                    Smoker
                  </span>
                  <span className="block text-xs text-slate-500">
                    Increases premium significantly
                  </span>
                </div>
              </div>
              <button
                className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${
                  formData.smoker ? "bg-red-500" : "bg-slate-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-1 duration-300 transition-normal ${
                    formData.smoker ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
            <div className="col-span-1 p-4">
              <label htmlFor="name">Children</label>
              <Counter
                onClick={(e) => e.preventDefault()}
                number={formData.Children}
                setNumber={(number) => handleChange("Children", number)}
                className="mt-2"
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionForm;
