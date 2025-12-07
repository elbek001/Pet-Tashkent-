export default function FilterSidebar({ filters, setFilters }) {
  return (
    <div className="p-5 bg-white rounded-xl shadow-sm space-y-6">
      <h2 className="text-xl font-bold">Filters</h2>

      {/* 🔍 SEARCH (NAME + BREED) */}
      <div>
        <label className="block font-medium mb-1">
          Search (name or breed)
        </label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) =>
            setFilters((p) => ({ ...p, search: e.target.value }))
          }
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Марта, Персидская..."
        />
      </div>

      {/* 🐾 TYPE – RADIO */}
      <div>
        <p className="font-medium mb-2">Animal Type</p>
        {["all", "dog", "cat", "bird"].map((t) => (
          <label key={t} className="block text-sm">
            <input
              type="radio"
              name="type"
              value={t}
              checked={filters.type === t}
              onChange={(e) =>
                setFilters((p) => ({ ...p, type: e.target.value }))
              }
              className="mr-2"
            />
            {t === "all" ? "All" : t}
          </label>
        ))}
      </div>

      {/* 💰 STATUS – RADIO */}
      <div>
        <p className="font-medium mb-2">Status</p>
        {["all", "adoption", "sale", "fostering"].map((s) => (
          <label key={s} className="block text-sm">
            <input
              type="radio"
              name="status"
              value={s}
              checked={filters.status === s}
              onChange={(e) =>
                setFilters((p) => ({ ...p, status: e.target.value }))
              }
              className="mr-2"
            />
            {s}
          </label>
        ))}
      </div>
    </div>
  );
}
