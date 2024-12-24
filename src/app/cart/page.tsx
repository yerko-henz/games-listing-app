"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Game } from "@/utils/endpoint";

export default function Cart() {
  const [cartItems, setCartItems] = useState<Game[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]") as Game[];
    setCartItems(cart);
  }, []);

  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="mx-4 sm:mx-12 mb-4">
      <Link href="/" className="text-text-secondary hover:underline mb-3 block">
        &larr; Back to Catalog
      </Link>
      {cartItems.length === 0 ? (
        <div className="mb-4">
          <p className="text-lg text-text-primary">No items in your cart</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-text-primary">Your Cart</h1>
            <p className="text-lg text-text-secondary">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </p>
          </div>

          <div className="flex justify-between flex-col lg:flex-row">
            <div className="w-full lg:w-[500px] xl:w-[650px]">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`relative flex items-center py-4 ${
                    index !== cartItems.length - 1
                      ? "border-b border-border-primary"
                      : ""
                  }`}
                >
                  <div className="w-24 h-24 relative mr-4 min-w-[90px] min-h-[90px]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <span className="text-sm text-text-secondary mb-1">
                      {item.genre}
                    </span>
                    <h2 className="text-lg font-bold text-text-primary">
                      {item.name}
                    </h2>
                    <p className="text-text-primary mb-2">{item.description}</p>
                    <span className="text-lg font-semibold text-text-primary self-end">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-0 right-0 p-2 text-text-secondary hover:text-text-primary"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-[400px] lg:h-[300px] mt-8 lg:mt-0">
              <div className="p-6 rounded-lg border border-border-primary">
                <h2 className="text-xl font-bold text-text-primary mb-4">
                  Order Summary
                </h2>
                <p className="text-lg text-text-secondary mb-4">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                </p>

                <div className="mb-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-text-primary mb-2"
                    >
                      <span>{item.name}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <hr className="border-border-primary mb-4" />

                <div className="flex justify-between text-lg font-bold text-text-primary mb-4">
                  <span>Order Total</span>
                  <span data-testid="total-price">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              <button className="w-full bg-button-bgPrimary text-button-bgSecondary py-2 rounded-lg font-semibold hover:bg-button-bgPrimary-dark mt-4">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
