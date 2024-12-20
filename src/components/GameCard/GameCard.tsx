"use client";

import { Game } from "@/utils/endpoint";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GameCard({ game }: { game: Game }) {
  const { name, genre, id, image, isNew } = game;

  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setIsInCart(cart.some((game: Game) => game.id === id));
  }, [id]);

  const handleCartAction = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (isInCart) {
      const newCart = cart.filter((game: Game) => game.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setIsInCart(false);
    } else {
      const newCart = [...cart, game];
      localStorage.setItem("cart", JSON.stringify(newCart));
      setIsInCart(true);
    }

    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div
      key={id}
      className="relative border border-border-primary rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col
                 w-[380px] h-[450px] max-w-full mx-auto 
                 sm:w-full sm:h-[400px]
                 lg:w-[380px] lg:h-[450px]"
    >
      <div
        className="relative w-[calc(100%-40px)] h-[450px] m-5
                    sm:h-[240px]"
      >
        {isNew && (
          <span className="absolute top-2 left-2 bg-white text-text-primary border border-border-primary w-[50px] h-[30px] flex items-center justify-center text-sm rounded z-[1]">
            New
          </span>
        )}
        <div className="relative overflow-hidden h-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover border rounded-t-xl"
            sizes="(max-width: 1024px) calc(100vw - 40px), 340px"
          />
        </div>
      </div>

      <div className="px-5 flex flex-col">
        <span className="text-sm text-text-secondary py-1 rounded-full w-fit">
          {genre}
        </span>
        <h2 className="font-bold text-lg line-clamp-2 mb-2 text-text-primary">
          {name}
        </h2>
      </div>

      <div className="px-5 pb-5 mt-auto">
        <button
          onClick={handleCartAction}
          className={`${
            !isInCart
              ? "bg-button-bgSecondary focus:bg-button-bgSecondary text-text-primary border border-border-secondary"
              : "bg-page-bgTertiary focus:bg-page-bgTertiary text-button-bgSecondary border border-border-secondary"
          } py-2 rounded-lg transition-colors duration-200 w-full 
          `}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
