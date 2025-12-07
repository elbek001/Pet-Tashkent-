import React from "react";
import AnimalCard from "./AnimalCard";

export default function AnimalGrid({ animals }) {
  if (!animals.length) {
    return (
      <div className="text-center p-8 text-gray-500">
        No Animals Found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {animals.map((a) => (
        <AnimalCard key={a._id} animal={a} />
      ))}
    </div>
  );
}
