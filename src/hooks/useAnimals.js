import { useEffect, useState } from "react";

export default function useAnimals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://animal-wovi.onrender.com/api/animals")
      .then((res) => res.json())
      .then((json) => setAnimals(json.data || []))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { animals, loading, error };
}
