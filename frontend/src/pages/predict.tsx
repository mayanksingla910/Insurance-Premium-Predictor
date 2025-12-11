import PredictionForm from "@/components/predictionForm";
import PriceCard from "@/components/priceCard";
import WelcomeCard from "@/components/welcomeCard";
import { useState } from "react";


const Predict = () => {

  const [loading, setLoading] = useState(false);
  const [premium, setPremium] = useState<number | null>(null);

  return (
    <div className="space-y-6 mb-10">
      <WelcomeCard />
      <PredictionForm loading={loading} setLoading={setLoading} premium={premium} setPremium={setPremium} />
      <PriceCard loading={loading} premium={premium} />
    </div>
  );
};

export default Predict;
