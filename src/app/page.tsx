"use client";

import { useEffect, useState } from "react";
import GamesList from "@/components/GamesList";

const Home = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;

      if (document.body.offsetHeight > 2000 && scrollPosition >= 1800) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mt-[50px]">
      <GamesList />
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-2 flex items-center justify-center bg-white text-text-primary border border-border-primary w-[50px] h-[30px]"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Home;
