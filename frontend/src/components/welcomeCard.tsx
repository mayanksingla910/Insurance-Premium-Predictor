import Particles from "@/components/particles";
import { motion } from "framer-motion";

const WelcomeCard = () => {
  return (
    <div className="relative flex items-center bg-primary h-36 w-[98%] rounded-lg mt-2 mx-auto">
      <Particles
        particleColors={["#ffffff", "#30b3df"]}
        particleCount={300}
        particleSpread={20}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
      <div className="m-10 absolute w-[90%]">
        <div className="">
          <h1 className="text-primary-foreground text-2xl sm:text-3xl font-bold w-fit transition-all duration-300">
            Insurance Premium Predictor
          </h1>
          <h2 className="text-muted text-md sm:text-lg mt-1 w-fit transition-all duration-300">
            Predict your insurance premium easily!
          </h2>
        </div>
        <div>
          <motion.img
            src="insurance-concept-illustration_86047-116-removebg-preview.png"
            alt="insurance"
            className="absolute h-32 md:h-40 right-0 sm:-right-5 md:right-0 -bottom-28 sm:-bottom-14 transition-all duration-300"
            animate={{
              y: [0, -5, 5, -3, 0],
              rotate: [0, -1, 1, -0.5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
