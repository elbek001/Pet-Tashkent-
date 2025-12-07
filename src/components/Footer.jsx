import React from "react";

// Oddiy SVG ikonkalar
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.14.14-.26.26-.534.26l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="w-full bg-[#80bacf] border-t border-[#6fa6b9] pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-[90px] flex flex-col md:flex-row justify-between gap-10">
        {/* Column 1 */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-white">Dorixona</h3>
          <p className="text-white leading-relaxed w-[85%]">
            Sizning sog'lig'ingiz – bizning g'amxo'rligimiz.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-white">Havolalar</h3>
          <ul className="text-white space-y-2">
            <li><a href="/about" className="hover:text-[#008ba7] duration-200">Biz haqimizda</a></li>
            <li><a href="/contact" className="hover:text-[#008ba7] duration-200">Bog'lanish</a></li>
            <li><a href="/terms" className="hover:text-[#008ba7] duration-200">Foydalanish shartlari</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-white">Bog'lanish</h3>
          <p className="text-white leading-relaxed">
            Toshkent sh., Mustaqillik ko'chasi, 1 <br />
            +998 71 234 56 78 <br />
            info@dorixona.uz
          </p>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-white">Ijtimoiy tarmoqlar</h3>
          <div className="flex gap-4 text-white">
            <a href="https://facebook.com" className="hover:text-[#6fa6b9] duration-200">
              <FacebookIcon />
            </a>
            <a href="https://telegram.org" className="hover:text-[#6fa6b9] duration-200">
              <TelegramIcon />
            </a>
            <a href="https://instagram.com" className="hover:text-[#6fa6b9] duration-200">
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <hr className="my-8 border-[#6fa6b9]" />
        <p className="text-center text-white text-sm">
          © 2025 Dorixona. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
