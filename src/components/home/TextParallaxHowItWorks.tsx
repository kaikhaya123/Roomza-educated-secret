'use client';

import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: ReactNode;
  stepNumber: number;
  totalSteps: number;
}

interface StickyImageProps {
  imgUrl: string;
  stepNumber: number;
  totalSteps: number;
}

interface OverlayCopyProps {
  subheading: string;
  heading: string;
  stepNumber: number;
  totalSteps: number;
}

interface ExampleContentProps {
  title: string;
  description: string;
  stepNumber: number;
  totalSteps: number;
  showCTA?: boolean;
}

// Determine if step is first, last, or middle
const getStepWeight = (stepNumber: number, totalSteps: number) => {
  if (stepNumber === 1 || stepNumber === totalSteps) return 'heavy';
  return 'light';
};

// Get animation timing based on weight
const getAnimationTiming = (stepNumber: number, totalSteps: number) => {
  const weight = getStepWeight(stepNumber, totalSteps);
  return weight === 'heavy' ? 0.8 : 0.4; // heavy steps are slower (0.8s), light are faster (0.4s)
};

// Get height based on weight
const getSectionHeight = (stepNumber: number, totalSteps: number) => {
  const weight = getStepWeight(stepNumber, totalSteps);
  return weight === 'heavy' ? 'h-[150vh]' : 'h-[100vh]';
};

export const TextParallaxHowItWorks = () => {
  const totalSteps = 6;
  
  return (
    <div className="bg-black">
      <TextParallaxContent
        imgUrl="/Images/vertical-shot-curly-haired-millennial-girl-sits-crossed-legs-uses-mobile-phone-laptop-computer-connected-wireless.jpg"
        subheading="Step 1"
        heading="Register and Verify"
        stepNumber={1}
        totalSteps={totalSteps}
      >
        <ExampleContent
          title="Create Your Account"
          description="Join in seconds. Verify your identity. Start building your voice in the movement."
          stepNumber={1}
          totalSteps={totalSteps}
          showCTA={false}
        />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="/Images/person-pressing-buzzer.jpg"
        subheading="Step 2"
        heading="Apply or Nominate"
        stepNumber={2}
        totalSteps={totalSteps}
      >
        <ExampleContent
          title="Get in the Ring"
          description="Upload. Inspire. Get nominated by thousands."
          stepNumber={2}
          totalSteps={totalSteps}
          showCTA={false}
        />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="/Images/front-view-women-pressing-buzzer.jpg"
        subheading="Step 3"
        heading="Vote and Play Daily"
        stepNumber={3}
        totalSteps={totalSteps}
      >
        <ExampleContent
          title="Shape the Game"
          description="100 free votes daily. Quizzes. Live leaderboards. You decide who rises."
          stepNumber={3}
          totalSteps={totalSteps}
          showCTA={false}
        />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="/Images/african-american-woman-watching-streaming-service.jpg"
        subheading="Step 4"
        heading="Watch Live and Vote"
        stepNumber={4}
        totalSteps={totalSteps}
      >
        <ExampleContent
          title="Real-Time Influence"
          description="The show streams live across all platforms. Your vote happens in real time."
          stepNumber={4}
          totalSteps={totalSteps}
          showCTA={false}
        />
      </TextParallaxContent>

      <TrustAndIntegrity />

      <TextParallaxContent
        imgUrl="/Images/still-life-betrayal-concept.jpg"
        subheading="Step 5"
        heading="Growth Beyond Competition"
        stepNumber={5}
        totalSteps={totalSteps}
      >
        <ExampleContent
          title="Leadership Development"
          description="Evicted? Never. You move to the Leadership House. Mentorship. Training. Growth."
          stepNumber={5}
          totalSteps={totalSteps}
          showCTA={false}
        />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="/Images/cheerful-women-holding-trophy-icon.jpg"
        subheading="Step 6"
        heading="Win. Impact. Change"
        stepNumber={6}
        totalSteps={totalSteps}
      >
        <ExampleContent
          title="The Final Round"
          description="The nation votes. Winners are crowned. Bursaries awarded. Projects launched that change communities."
          stepNumber={6}
          totalSteps={totalSteps}
          showCTA={true}
        />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ 
  imgUrl, 
  subheading, 
  heading, 
  children,
  stepNumber,
  totalSteps
}: TextParallaxContentProps) => {
  const heightClass = getSectionHeight(stepNumber, totalSteps);
  
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className={`relative ${heightClass}`}>
        <StickyImage 
          imgUrl={imgUrl} 
          stepNumber={stepNumber}
          totalSteps={totalSteps}
        />
        <OverlayCopy 
          heading={heading} 
          subheading={subheading}
          stepNumber={stepNumber}
          totalSteps={totalSteps}
        />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl, stepNumber, totalSteps }: StickyImageProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-black/60"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading, stepNumber, totalSteps }: OverlayCopyProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const weight = getStepWeight(stepNumber, totalSteps);
  const isHeavy = weight === 'heavy';

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <motion.p 
        className="mb-2 text-center text-xl md:mb-4 md:text-3xl font-semibold tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {subheading}
      </motion.p>
      <motion.p 
        className={`text-center font-black tracking-tight ${
          isHeavy 
            ? 'text-5xl md:text-8xl leading-tight' 
            : 'text-4xl md:text-6xl'
        }`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {heading}
      </motion.p>
    </motion.div>
  );
};

const ExampleContent = ({ 
  title, 
  description, 
  stepNumber, 
  totalSteps,
  showCTA = false
}: ExampleContentProps) => {
  const weight = getStepWeight(stepNumber, totalSteps);
  const isHeavy = weight === 'heavy';
  
  return (
    <div className={`mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 ${
      isHeavy ? 'pb-32 pt-20' : 'pb-16 pt-8'
    } md:grid-cols-12 bg-black`}>
      <motion.h2 
        className={`col-span-1 font-black text-white ${
          isHeavy 
            ? 'text-5xl md:text-6xl' 
            : 'text-3xl md:text-4xl'
        } md:col-span-4`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
      <motion.div 
        className="col-span-1 md:col-span-8"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <p className={`mb-8 text-gray-300 ${
          isHeavy 
            ? 'text-2xl md:text-3xl leading-relaxed' 
            : 'text-lg md:text-xl leading-relaxed'
        }`}>
          {description}
        </p>
        {showCTA && (
          <motion.a 
            href="/challenges" 
            className="inline-flex items-center gap-2 rounded bg-brand-yellow px-9 py-4 text-lg font-semibold text-black transition-all hover:bg-brand-yellow/80 active:scale-95"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey <FiArrowUpRight />
          </motion.a>
        )}
      </motion.div>
    </div>
  );
};

const TrustAndIntegrity = () => (
  <motion.div 
    className="mx-auto max-w-5xl px-4 py-24 bg-black"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <div className="rounded-3xl border border-gray-800 p-12 bg-gradient-to-br from-gray-900 to-black">
      <motion.h2 
        className="text-4xl md:text-5xl font-black text-white mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Built on Trust
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white mb-3">Verified. Secure. Fair.</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Every vote counted. Every participant verified. Anti-fraud systems active 24/7.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white mb-3">Transparent. Always.</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Rules are clear. Outcomes are public. No hidden agendas. Just leadership.
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="border-t border-gray-800 pt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <p className="text-2xl font-bold text-white mb-3">
          Your voice. Your choice. Your future.
        </p>
        <p className="text-xl font-semibold text-brand-yellow">
          Together, we're building the next generation of leaders.
        </p>
      </motion.div>
    </div>
  </motion.div>
);
