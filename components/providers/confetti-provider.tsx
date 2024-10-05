"use client";

import ReactConfetti from "react-confetti";

import { useConfettiStore } from "@/hooks/use-confetti-store";

export const ConfettiProvider = () => {
  const confetti = useConfettiStore();

  if (!confetti.isOpen) return null;
  return (
    <div className="pointer-event-noneabsolute top-0 left-0 w-full h-full z-50">
      <ReactConfetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={500}
        className="z-50"
        onConfettiComplete={() => confetti.onClose()}
      />
    </div>
  );
};
