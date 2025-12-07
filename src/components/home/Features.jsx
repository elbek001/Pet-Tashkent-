import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Calendar, Check, Heart, X } from 'lucide-react';

const Features = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://animal-wovi.onrender.com/api/animals');
      if (!response.ok) throw new Error('Failed to fetch animals');
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setAnimals(data);
      } else if (data.animals && Array.isArray(data.animals)) {
        setAnimals(data.animals);
      } else if (data.data && Array.isArray(data.data)) {
        setAnimals(data.data);
      } else {
        setAnimals([]);
      }
      
      setError(null);
    } catch (err) {
      setError(err.message);
      setAnimals([]);
    } finally {
      setLoading(false);
    }
  };

  const PetCard = ({ pet, isAdopted = false }) => {
    const isUrgent = pet.urgent;
    const isFeatured = pet.priceType === 'free' || pet.price === 0;

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
        <div className="relative overflow-hidden">
          <img 
            src={pet.imageUrl || pet.images?.[0] || 'https://via.placeholder.com/300x300?text=Pet'} 
            alt={pet.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x300?text=Pet';
            }}
          />
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
              isAdopted ? 'bg-emerald-500 text-white' : 
              isFeatured ? 'bg-amber-400 text-gray-900' : 'bg-blue-500 text-white'
            }`}>
              {isAdopted ? 'Adopted' : isFeatured ? 'Featured' : 'Available'}
            </span>
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-800 mb-3">{pet.name}</h3>
          
          <div className="space-y-2 mb-4 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="mr-2">🐾</span>
              <span>{pet.breed}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{pet.age}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">{pet.gender === 'female' ? '♀' : '♂'}</span>
              <span className="capitalize">{pet.gender === 'female' ? 'Female' : 'Male'}</span>
            </div>
          </div>

          <button 
            onClick={() => setSelectedPet(pet)}
            className={`w-full font-semibold py-2.5 rounded-lg transition-all duration-200 ${
              isAdopted 
                ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isAdopted ? 'Homed!' : 'View Details'}
          </button>
        </div>
      </div>
    );
  };

  const PetModal = ({ pet, onClose }) => {
    if (!pet) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={onClose}>
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="relative">
            <img 
              src={pet.imageUrl || pet.images?.[0] || 'https://via.placeholder.com/800x500?text=Pet'} 
              alt={pet.name}
              className="w-full h-96 object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x500?text=Pet';
              }}
            />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 shadow-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">{pet.name}</h2>
                <p className="text-lg text-gray-600">{pet.breed}</p>
              </div>
              <button className="bg-red-50 p-3 rounded-full hover:bg-red-100 transition-colors">
                <Heart className="w-6 h-6 text-red-500" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <p className="text-gray-500 text-sm mb-1">Age</p>
                <p className="font-bold text-gray-800">{pet.age}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <p className="text-gray-500 text-sm mb-1">Gender</p>
                <p className="font-bold text-gray-800 capitalize">{pet.gender}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <p className="text-gray-500 text-sm mb-1">Type</p>
                <p className="font-bold text-gray-800 capitalize">{pet.type}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <p className="text-gray-500 text-sm mb-1">Price</p>
                <p className="font-bold text-green-600">{pet.price > 0 ? `${pet.price} сум` : 'Free'}</p>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              {pet.vaccinated && (
                <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center gap-2">
                  <Check className="w-4 h-4" /> Vaccinated
                </span>
              )}
              {pet.sterilized && (
                <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium flex items-center gap-2">
                  <Check className="w-4 h-4" /> Sterilized
                </span>
              )}
            </div>

            {pet.description && (
              <div className="mb-8">
                <h3 className="font-bold text-xl mb-3 text-gray-800">About {pet.name}</h3>
                <p className="text-gray-600 leading-relaxed">{pet.description}</p>
              </div>
            )}

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
              <h3 className="font-bold text-xl mb-4 text-gray-800">Contact Information</h3>
              <div className="space-y-3">
                {pet.contactName && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      👤
                    </div>
                    <span className="font-medium">{pet.contactName}</span>
                  </div>
                )}
                {pet.contactPhone && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-blue-500" />
                    </div>
                    <span>{pet.contactPhone}</span>
                  </div>
                )}
                {pet.contactEmail && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-purple-500" />
                    </div>
                    <span>{pet.contactEmail}</span>
                  </div>
                )}
                {pet.location && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-red-500" />
                    </div>
                    <span>{pet.district || pet.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading pets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-red-500 text-xl font-bold mb-2">Error Loading</p>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchAnimals}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const featuredPets = Array.isArray(animals) ? animals.filter(pet => pet.priceType === 'free' || pet.price === 0) : [];
  const adoptedPets = Array.isArray(animals) ? animals.filter(pet => pet.status === 'adopted' || pet.adopted === true) : [];
  const forSalePets = Array.isArray(animals) ? animals.filter(pet => 
    (pet.priceType !== 'free' && pet.price > 0) && 
    (pet.status !== 'adopted' && pet.adopted !== true)
  ) : [];
  
  const displayPets = activeTab === 'all' ? animals : 
                      activeTab === 'featured' ? featuredPets : 
                      activeTab === 'forSale' ? forSalePets : adoptedPets;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r text-blue-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-4xl font-bold mb-4">
              Featured & Recently Homed Pets
            </h1>
            <p className="text-xl text-gray-700">
              Find your new best friend or see our recent happy tails
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-8 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'all' 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveTab('featured')}
            className={`px-8 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'featured' 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Free Adoption
          </button>
          <button 
            onClick={() => setActiveTab('forSale')}
            className={`px-8 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'forSale' 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            For Sale
          </button>
          <button 
            onClick={() => setActiveTab('adopted')}
            className={`px-8 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'adopted' 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Adopted
          </button>
        </div>

        {/* Featured Section */}
        {(activeTab === 'all' || activeTab === 'featured') && featuredPets.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Free Adoption - Looking for a Home
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPets.map(pet => (
                <PetCard key={pet._id || pet.id} pet={pet} isAdopted={false} />
              ))}
            </div>
          </section>
        )}

        {/* For Sale Section */}
        {(activeTab === 'all' || activeTab === 'forSale') && forSalePets.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Pets For Sale
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {forSalePets.map(pet => (
                <PetCard key={pet._id || pet.id} pet={pet} isAdopted={false} />
              ))}
            </div>
          </section>
        )}

        {/* Adopted Section */}
        {(activeTab === 'all' || activeTab === 'adopted') && adoptedPets.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Happy Tails: Our Recent Adoptions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {adoptedPets.map(pet => (
                <PetCard key={pet._id || pet.id} pet={pet} isAdopted={true} />
              ))}
            </div>
          </section>
        )}

        {displayPets.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🐾</div>
            <p className="text-2xl text-gray-600 font-medium">No pets found in this category</p>
          </div>
        )}
      </div>

      {selectedPet && <PetModal pet={selectedPet} onClose={() => setSelectedPet(null)} />}
    </div>
  );
};

export default Features;    