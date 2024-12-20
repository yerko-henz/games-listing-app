"use client";

import { GameCardProps } from "./types";

export default function GameCard({ name, genre, id }: GameCardProps) {
  return (
    <div
      key={id}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-4">
        <h2 className="font-bold text-lg mb-2">{name}</h2>
        <p className="text-gray-600">{genre}</p>
      </div>
    </div>
  );
}
