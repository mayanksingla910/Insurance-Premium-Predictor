import { CheckCircle2, DollarSign } from "lucide-react";

const PriceCard = ({loading, premium}: {loading: boolean, premium: number | null}) => {
  return (
    <div
      className={`bg-card rounded-2xl shadow-lg border border-border/60 w-[95%] mx-auto p-8 text-center transition-all duration-500 ${
        loading ? "opacity-60 blur-sm" : "opacity-100"
      }`}
    >
      <h3 className="text-slate-500 font-medium uppercase tracking-wider text-xs mb-2">
        Estimated Annual Premium
      </h3>

      {premium ? (
        <div className="animate-in fade-in zoom-in duration-500">
          <div className="flex items-start justify-center text-foreground leading-none">
            <span className="text-3xl font-bold mt-2">$</span>
            <span className="text-6xl font-extrabold tracking-tight">
              {Math.floor(premium).toLocaleString()}
            </span>
            <span className="text-xl font-medium mt-auto mb-2 text-slate-400">
              .00
            </span>
          </div>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-accent text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            Quote Generated
          </div>
        </div>
      ) : (
        <div className="py-8">
          <div className="w-20 h-20 bg-slate-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <DollarSign className="w-10 h-10 text-slate-400" />
          </div>
          <p className="text-slate-400 text-sm">
            Enter your details to view price
          </p>
        </div>
      )}
    </div>
  );
};

export default PriceCard;
