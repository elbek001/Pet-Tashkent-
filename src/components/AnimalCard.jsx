import React from "react";
import { Heart } from "lucide-react";

export default function AnimalCard({ animal }) {
  if (!animal) return null;

  const imgSrc =
    animal.imageUrl ??
    (Array.isArray(animal.images) && animal.images.length > 0
      ? animal.images[0]
      : null);

  // status label
  const statusLabel =
    animal.priceType === "free"
      ? "Adoption"
      : animal.priceType === "sale"
      ? "For Sale"
      : "Foster";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
      {/* IMAGE */}
      <div className="relative h-52 bg-gray-100">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={animal.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        {/* URGENT */}
        {animal.urgent && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Urgent
          </span>
        )}

        {/* FAVORITE */}
        <button className="absolute top-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full shadow">
          <Heart className="w-4 h-4 text-gray-500 hover:text-red-500" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold text-gray-800 truncate">
            {animal.name}
          </h2>
          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
            {statusLabel}
          </span>
        </div>

        <p className="text-sm text-gray-500">
          {animal.breed || "Unknown breed"}
        </p>

        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>{animal.age}</span>
          <span className="capitalize">{animal.gender}</span>
        </div>

        <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl text-sm font-medium transition">
          View Details
        </button>
      </div>
    </div>
  );
}
