import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import API from "../api/axiosInstance";
import Loader from "./Loader";

// RASMLAR
import imgVitamin from "../assets/categories/vitamin.jpg";
import imgPain from "../assets/categories/pain.jpg";
import imgCold from "../assets/categories/cold.jpg";
import imgBeauty from "../assets/categories/beauty.jpg";
import imgTech from "../assets/categories/tech.jpg";
import imgBaby from "../assets/categories/mom.jpg";

// 🔥 Normalizatsiya funksiyasi
const normalize = (str) =>
  str
    ?.toLowerCase()
    .replace(/['‘’`]/g, "'") // Hamma apostroflarni bir xil qiladi
    .trim();

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📌 Rasm mapping — endi normalizatsiya qilingan holda
  const categoryImages = {
    "vitaminlar": imgVitamin,
    "og'riq qoldiruvchilar": imgPain,
    "shamollash va gripp dorilari": imgCold,
    "ona va bola uchun": imgBaby,
    "tibbiy texnika": imgTech,
    "go'zallik mahsulotlari": imgBeauty,
  };

  const fallbackCategories = [
    "Vitaminlar",
    "Og'riq qoldiruvchilar",
    "Shamollash va Gripp dorilari",
    "Ona va bola uchun",
    "Tibbiy texnika",
    "Go'zallik mahsulotlari",
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get("/utils/categories");
        setCategories(response.data.categories || fallbackCategories);
      } catch (err) {
        console.log("Kategoriyalarni yuklashda xatolik:", err);
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="w-full my-8">
      <h2 className="text-gray-800 text-3xl font-semibold mb-8">
        Dori kategoriyalari
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={22}
        slidesPerView={2}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
      >
        {categories.map((category, index) => {
          const normalized = normalize(category);
          const img = categoryImages[normalized];

          return (
            <SwiperSlide key={index}>
              <div className="p-4  flex flex-col items-center">
                
                {/* Dumaloq rasm */}
                <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm">
                  <img
                    src={img}
                    alt={category}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-gray-600 text-sm text-center font-medium mt-2">
                  {category}
                </h3>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Category;
