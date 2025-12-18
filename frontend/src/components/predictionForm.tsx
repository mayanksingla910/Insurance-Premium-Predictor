import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Slider } from "./ui/slider";
import { ChevronRight, Cigarette, Loader2, MapPin, Mars } from "lucide-react";
import { Venus } from "lucide-react";
import { Counter } from "./ui/shadcn-io/counter";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import axios from "axios";
import CalculateBmiModel from "./calculateBmiModel";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const PredictionForm = ({
  loading,
  setLoading,
  premium,
  setPremium,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  premium: number | null;
  setPremium: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [formData, setFormData] = useState({
    age: 25,
    bmi: 22,
    smoker: false,
    children: 0,
    region: "northwest",
    sex: "male",
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const coldStartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstRun = useRef(true);

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBmiCalculation = async ( bmi: number) => {

    setFormData((prev) => ({
      ...prev,
      bmi: bmi,
    }));
  };

const handleSubmit = async (e?: React.FormEvent) => {
  if (e) e.preventDefault();

  if (coldStartTimerRef.current) {
    clearTimeout(coldStartTimerRef.current);
  }
  
  coldStartTimerRef.current = setTimeout(() => {
    toast.info("Please wait, the server might be experiencing a cold start.");
  }, 15000);

  try {
    setLoading(true);

    const response = await axios.post(
      "https://insurance-premium-predictor-fuwb.onrender.com/predict",
      formData,
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data.premium < 200) setPremium(200);
    else setPremium(response.data.premium);
  } catch (error) {
    toast.error("Something went wrong. Try again.");
    console.error(error);
  } finally {
    setLoading(false);

    if (coldStartTimerRef.current) {
      clearTimeout(coldStartTimerRef.current);
      coldStartTimerRef.current = null;
    }
  }
};


  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    if (premium === null) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      handleSubmit();
    }, 500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [formData]);

  return (
    <div className=" mt-6">
      <Card className="w-[95%] mx-auto ">
        <CardTitle className="text-2xl font-bold mx-10">
          Personal Details
        </CardTitle>
        <div className="border-b border-border mx-6" />
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2"
          >
            <div className="col-span-1 p-4">
              <div className="flex justify-between">
                <label htmlFor="Age" className="ml-1">
                  Age
                </label>
                <span className="text-primary text-sm font-bold">
                  {formData.age} years
                </span>
              </div>
              <Slider
                onValueChange={(value) => handleChange("age", value[0])}
                defaultValue={[25]}
                min={18}
                max={100}
                className="mt-2 w-full"
              />
              <div className="flex justify-between text-slate-500 text-xs mt-2">
                <span>18</span>
                <span>100</span>
              </div>
            </div>
            <div className="col-span-1 p-4">
              <div className="flex justify-between">
                <label htmlFor="BMI" className="ml-1">
                  BMI
                </label>
                <div className="flex items-center gap-x-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <p className="p-1 text-xs text-primary hover:underline cursor-pointer">
                        Check BMI
                      </p>
                    </DialogTrigger>
                    <DialogContent className="w-full">
                      <CalculateBmiModel handleBmiCalculation={handleBmiCalculation}/>
                    </DialogContent>
                  </Dialog>
                  <span
                    className={`text-sm font-bold ${
                      formData.bmi >= 25 ? "text-orange-500" : "text-green-600"
                    }`}
                  >
                    {formData.bmi}
                  </span>
                </div>
              </div>
              <Slider
                onValueChange={(value) => handleChange("bmi", value[0])}
                defaultValue={[22]}
                min={15}
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
              <label htmlFor="sex" className="ml-1">
                sex
              </label>
              <div className="flex bg-input p-1 rounded-lg mt-2">
                {["male", "female"].map((g) => (
                  <button
                    key={g}
                    onClick={(e) => {
                      e.preventDefault();
                      handleChange("sex", g);
                    }}
                    className={`flex justify-center items-center gap-2 py-2 w-full text-sm font-medium rounded-md capitalize transition-all  ${
                      formData.sex === g
                        ? "bg-primary-foreground text-primary shadow-sm"
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
              className="flex items-center justify-between m-4 h-fit col-span-1 my-auto bg-input p-4 rounded-lg border cursor-pointer border-border/40"
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
              <label htmlFor="name" className="ml-1">
                Children
              </label>
              <Counter
                onClick={(e) => e.preventDefault()}
                number={formData.children}
                setNumber={(number) =>
                  handleChange("children", Math.max(0, Math.min(20, number)))
                }
                className="mt-2"
              />
            </div>
            <div className="col-span-1 p-4">
              <label htmlFor="region" className="ml-1">
                Region
              </label>
              <Select
                required
                onValueChange={(value) => handleChange("region", value)}
              >
                <SelectTrigger className="w-full bg-input mt-2 py-5">
                  <div className="flex items-center gap-x-5 ">
                    <MapPin className="size-5 " />
                    <SelectValue placeholder={"Select Your Region"} />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Regions</SelectLabel>
                    <SelectItem value="northwest">Northwest</SelectItem>
                    <SelectItem value="northeast">Northeast</SelectItem>
                    <SelectItem value="southwest">Southwest</SelectItem>
                    <SelectItem value="southeast">Southeast</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-1 md:col-span-2  mt-4 space-y-2">
              <div className="border-b border-border" />
              <Button type="submit" disabled={loading} className="w-full my-4 shadow-lg">
                {loading ? (
                  <Loader2 className="animate-spin size-5" />
                ) : (
                  <>
                    Calculate Premium <ChevronRight />{" "}
                  </>
                )}{" "}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionForm;
