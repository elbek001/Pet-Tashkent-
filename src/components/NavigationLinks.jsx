import { NavLink } from "react-router-dom";
import img from "../assets/logoPharmacy.png"; // ❗ MUHIM: SENDA SHU YETISHMAYOTGAN EDI

export default function NavigationLinks() {
  return (
    <div className="bg-white fixed mb-7 top-0 left-0 w-full z-50">
      <div className="max-w-[1200px] mx-auto px-5 py-2 flex items-center justify-between">

        <NavLink to="/">
          <img src={img} alt="Dorixona Logo" className="w-[150px] h-20 object-cover" />
        </NavLink>

        <div className="flex items-center gap-6 text-sm font-semibold text-gray-700">
          <div className="flex items-center gap-8">

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `transition duration-200 py-1 border-b-2 ${
                  isActive
                    ? "text-[#008ba7] border-[#008ba7]"
                    : "hover:text-[#51dadc] text-gray-600 border-transparent hover:border-[#51dadc]"
                }`
              }
            >
              Bosh sahifa
            </NavLink>

            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `transition duration-200 py-1 border-b-2 ${
                  isActive
                    ? "text-[#008ba7] border-[#008ba7]"
                    : "hover:text-[#51dadc] text-gray-600 border-transparent hover:border-[#51dadc]"
                }`
              }
            >
              Kategoriyalar
            </NavLink>

            <NavLink
              to="/sales"
              className={({ isActive }) =>
                `transition duration-200 py-1 border-b-2 ${
                  isActive
                    ? "text-[#008ba7] border-[#008ba7]"
                    : "hover:text-[#51dadc] text-gray-600 border-transparent hover:border-[#51dadc]"
                }`
              }
            >
              Aksiyalar
            </NavLink>

            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `transition duration-200 py-1 border-b-2 ${
                  isActive
                    ? "text-[#008ba7] border-[#008ba7]"
                    : "hover:text-[#51dadc] text-gray-600 border-transparent hover:border-[#51dadc]"
                }`
              }
            >
              Blog
            </NavLink>
          </div>

          <div className="flex items-center space-x-3 ml-6">
            <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-200 text-gray-600 hover:text-red-500">
              ❤️
            </button>

            <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-200 text-gray-600 hover:text-[#008ba7] relative">
              <span className="absolute -top-1 -right-1 w-4 h-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                3
              </span>
              🛒
            </button>

            <div className="w-10 h-10 bg-[#008ba7] rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
              A
            </div>
          </div>
        </div>
      </div>

      {/* Input qismi */}
      <div className="max-w-full mx-auto px-12 py-2 bg-gray-50">
        <div className="relative flex justify-center">
          <svg
            className="absolute left-10 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8" />
          </svg>

          <input
            type="text"
            placeholder="Dori, vitamin yoki simptomni qidirish..."
            className="w-[95%] pl-11 py-4 shadow-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008ba7] bg-white text-base"
          />
        </div>
      </div>
    </div>
  );
}
