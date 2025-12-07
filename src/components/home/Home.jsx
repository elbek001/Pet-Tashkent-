import React, { useState, useEffect } from 'react';

const AnimalShelter = () => {
  const [animals, setAnimals] = useState([]);
  const [filter, setFilter] = useState('all');
  const [type, setType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const response = await fetch('https://animal-wovi.onrender.com/api/animals');
      const data = await response.json();
      if (data.success) {
        setAnimals(data.data);
      }
    } catch (error) {
      console.error('Error fetching animals:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { type: 'dog', name: 'Itlar', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop' },
    { type: 'cat', name: 'Mushuklar', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop' },
    { type: 'bird', name: 'Qushlar', image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=300&h=300&fit=crop' },
    { type: 'rabbit', name: 'Quyonlar', image: 'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=300&h=300&fit=crop' },
    { type: 'all', name: 'Barchasi', image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=300&h=300&fit=crop' }
  ];

  const filters = [
    { value: 'all', label: 'Barchasi' },
    { value: 'free', label: 'Bepul' },
    { value: 'sale', label: 'Sotish' },
    { value: 'foster', label: 'Vaqtincha parvarish' }
  ];

  const filteredAnimals = animals.filter(animal => {
    const typeMatch = type === 'all' || animal.type === type;
    const filterMatch = filter === 'all' || animal.priceType === filter;
    return typeMatch && filterMatch;
  });

  const handleCategoryClick = (categoryType) => {
    setType(categoryType);
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-gray-900/70 to-gray-900/70">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=1200)',
            filter: 'brightness(0.7)'
          }}
        />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Support Tashkent's Animals
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 drop-shadow-md leading-relaxed">
              Your contribution provides shelter, food, and medical care to animals in need across the city. 
              Every donation, big or small, makes a world of difference.
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-10 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Donate Now
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Categories Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Hayvon kategoriyalari</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {categories.map((category) => (
            <div
              key={category.type}
              onClick={() => handleCategoryClick(category.type)}
              className="text-center cursor-pointer transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-3 rounded-full overflow-hidden border-4 border-gray-200 hover:border-green-500 transition-colors">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-medium text-gray-700 text-lg">{category.name}</div>
            </div>
          ))}
        </div>

        {/* Filter Buttons */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Mavjud hayvonlar</h2>
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                filter === f.value
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-500'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Animals Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Yuklanmoqda...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAnimals.map((animal) => (
              <div
                key={animal._id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={animal.imageUrl}
                    alt={animal.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400';
                    }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{animal.name}</h3>
                  <p className="text-gray-500 mb-3">{animal.breed}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span>🎂 {animal.age}</span>
                    <span>{animal.gender === 'male' ? '♂️' : '♀️'} {animal.gender === 'male' ? 'Erkak' : 'Urg\'ochi'}</span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-3">📍 {animal.location}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {animal.priceType === 'free' && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        Bepul
                      </span>
                    )}
                    {animal.priceType === 'sale' && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                        Sotish - ${animal.price}
                      </span>
                    )}
                    {animal.priceType === 'foster' && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                        Parvarish - ${animal.price}/oy
                      </span>
                    )}
                    {animal.urgent && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                        Shoshilinch
                      </span>
                    )}
                    {animal.vaccinated && (
                      <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-xs font-semibold rounded-full">
                        Emlangan
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredAnimals.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">Hech qanday hayvon topilmadi</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalShelter;