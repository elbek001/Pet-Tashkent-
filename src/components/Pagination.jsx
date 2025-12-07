export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6 gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 border rounded ${
            p === currentPage
              ? "bg-green-500 text-white"
              : "bg-white hover:bg-gray-200"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
