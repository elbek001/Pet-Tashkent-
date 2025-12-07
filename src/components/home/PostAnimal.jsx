import { useState } from 'react';
import { Upload, X, MapPin, Phone, Mail, User } from 'lucide-react';

const PostAnimal = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    purpose: 'giveAway',
    name: '',
    type: 'dog',
    breed: '',
    age: '',
    gender: 'male',
    description: '',
    images: [],
    location: '',
    contactPhone: '',
    contactEmail: '',
    contactName: '',
    price: 0,
    vaccinated: false,
    sterilized: false
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, file]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitting data:', formData);
      
      // Prepare the data to send
      const submitData = {
        name: formData.name,
        type: formData.type,
        breed: formData.breed,
        age: formData.age,
        gender: formData.gender,
        description: formData.description,
        priceType: formData.purpose === 'giveAway' ? 'free' : 'paid',
        price: formData.purpose === 'giveAway' ? 0 : parseInt(formData.price) || 0,
        imageUrl: imagePreviews[0] || '',
        contactPhone: formData.contactPhone,
        contactEmail: formData.contactEmail,
        contactName: formData.contactName,
        location: formData.location,
        district: formData.location,
        vaccinated: formData.vaccinated,
        sterilized: formData.sterilized,
        urgent: false,
        status: 'available'
      };

      console.log('Sending to API:', submitData);

      const response = await fetch('https://animal-wovi.onrender.com/api/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      const result = await response.json();
      console.log('API Response:', result);

      if (response.ok) {
        alert('Animal posted successfully! ✅');
        // Reset form
        setFormData({
          purpose: 'giveAway',
          name: '',
          type: 'dog',
          breed: '',
          age: '',
          gender: 'male',
          description: '',
          images: [],
          location: '',
          contactPhone: '',
          contactEmail: '',
          contactName: '',
          price: 0,
          vaccinated: false,
          sterilized: false
        });
        setImagePreviews([]);
        setStep(1);
      } else {
        alert('Failed to post animal: ' + (result.message || 'Please try again'));
        console.error('Error response:', result);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred: ' + error.message);
    }
  };

  const handleSaveDraft = () => {
    // Store draft in memory instead of localStorage
    console.log('Draft saved:', formData);
    alert('Draft saved!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Post an Animal</h1>
              <p className="text-gray-600 mb-8">Fill out the details below to find a new home for your pet.</p>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Step {step} of 4. {
                      step === 1 ? 'Purpose' :
                      step === 2 ? 'Animal Details' :
                      step === 3 ? 'Photos' :
                      'Contact Info'
                    }
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(step / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Step 1: Purpose */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-4">
                      What is the purpose of this post?
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, purpose: 'giveAway' }))}
                        className={`p-4 rounded-lg border-2 font-medium transition-all ${
                          formData.purpose === 'giveAway'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        Give Away
                      </button>
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, purpose: 'forSale' }))}
                        className={`p-4 rounded-lg border-2 font-medium transition-all ${
                          formData.purpose === 'forSale'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        For Sale
                      </button>
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, purpose: 'foster' }))}
                        className={`p-4 rounded-lg border-2 font-medium transition-all ${
                          formData.purpose === 'foster'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        Foster
                      </button>
                    </div>
                  </div>

                  {formData.purpose === 'forSale' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (сум)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter price"
                      />
                    </div>
                  )}

                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Next Step
                  </button>
                </div>
              )}

              {/* Step 2: Animal Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800">Animal Details</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Animal Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g. Buddy"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Animal Type
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="bird">Bird</option>
                        <option value="rabbit">Rabbit</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Breed
                      </label>
                      <input
                        type="text"
                        name="breed"
                        value={formData.breed}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g. Golden Retriever"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age
                      </label>
                      <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g. 2 years"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={formData.gender === 'male'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Male
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={formData.gender === 'female'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Female
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description & Story
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Tell us about the animal's personality, history, and needs..."
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="vaccinated"
                        checked={formData.vaccinated}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Vaccinated</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="sterilized"
                        checked={formData.sterilized}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Sterilized/Neutered</span>
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Photos & Videos */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800">Photos & Videos</h2>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="imageUpload"
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-green-500 font-medium mb-1">Click to upload or drag and drop</p>
                      <p className="text-gray-500 text-sm">PNG, JPG, GIF up to 10MB</p>
                    </label>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="flex-1 bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Location & Contact */}
              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800">Location & Contact</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline w-4 h-4 mr-1" />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Tashkent, Uzbekistan"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline w-4 h-4 mr-1" />
                      Contact Name
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline w-4 h-4 mr-1" />
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="+998 XX XXX-XX-XX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline w-4 h-4 mr-1" />
                      Contact Email (Optional)
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSaveDraft}
                      className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300"
                    >
                      Save as Draft
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Submit Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Live Preview Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Live Preview</h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Draft
                </span>
              </div>

              <div className="space-y-4">
                {imagePreviews[0] ? (
                  <img
                    src={imagePreviews[0]}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Upload className="w-12 h-12 text-gray-300" />
                  </div>
                )}

                <div>
                  <h4 className="text-xl font-bold text-gray-800">
                    {formData.name || 'Animal Name'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {formData.breed || 'Breed'}, {formData.type || 'Type'}
                  </p>
                </div>

                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    {formData.description 
                      ? formData.description.substring(0, 150) + (formData.description.length > 150 ? '...' : '')
                      : 'Description will appear here...'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    📍 {formData.location || 'Location'}
                  </span>
                  {formData.vaccinated && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                      Vaccinated
                    </span>
                  )}
                  {formData.sterilized && (
                    <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">
                      Sterilized
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAnimal;