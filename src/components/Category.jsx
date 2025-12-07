import React, { useMemo, useState, useEffect } from "react";
import useAnimals from "../hooks/useAnimals";
import AnimalGrid from "./AnimalGrid";
import FilterSidebar from "./FilterSidebar";
import Pagination from "./Pagination";

export default function Category() {
  const { animals, loading, error } = useAnimals();

  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    status: "all",
  });

  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  useEffect(() => {
    if (filters.search.trim() !== "") {
      setFilters((prev) => ({
        ...prev,
        type: "all",
        status: "all",
      }));
    }
  }, [filters.search]);

  const filtered = useMemo(() => {
    return animals.filter((a) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!a.name?.toLowerCase().includes(q) && !a.breed?.toLowerCase().includes(q)) {
          return false;
        }
      }

      if (filters.type !== "all" && a.type !== filters.type) return false;

      if (filters.status !== "all") {
        const status =
          a.priceType === "free"
            ? "adoption"
            : a.priceType === "sale"
            ? "sale"
            : "fostering";
        if (status !== filters.status) return false;
      }

      return true;
    });
  }, [animals, filters]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Find Your New Best Friend</h1>
        <div className="flex gap-6">
          <aside className="w-1/4">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </aside>
          <main className="w-3/4">
            <AnimalGrid animals={paginated} />
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </main>
        </div>
      </div>
    </div>
  );
}
