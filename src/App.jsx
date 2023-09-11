import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import FavPoke from "./components/FavPoke";

function App() {
  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);

  useEffect(() => {
    loadApi();
  }, [number]);

  const loadApi = async () => {
    let abortController = new AbortController();
    try {
      setLoading(true);
      let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${number}`,
        {
          signal: abortController.signal,
        }
      );

      setPoke(response.data);
      setError("");
    } catch (error) {
      setError("something wrong!!", error);
    } finally {
      setLoading(false);
    }
    return () => abortController.abort();
  };

  console.log(poke);

  const prevPoke = () => {
    setNumber((number) => number - 1);
  };

  const nextPoke = () => {
    setNumber((number) => number + 1);
  };

  const addFavorite = () => {
    setFav((oldState) => [...oldState, poke]);
  };

  console.log(fav);

  return (
    <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div>
          {loading ? 
            <h1>Loading...</h1>
           : 
            <>
              <h1>{poke?.name}</h1>
              <button className="mt-5" onClick={addFavorite}>Add to Favorius</button>
              <br />
              <img
                src={poke?.sprites?.other?.home?.front_default}
                alt={poke?.name}
              />
              <ul className="mt-5">
                {poke?.abilities?.map((abi, index) => {
                  return (
                    <div key={index}>
                      <li className="mt-2 font-bold">- {abi.ability.name}</li>
                    </div>
                  );
                })}
              </ul>
              <ul className="mt-5 mb-5">
                <h1>Stats</h1>
                {poke?.stats?.map((sta, index) => {
                  return (
                    <div key={index}>
                      <p className="mt-2 font-bold">{sta.stat.name}</p>
                      <li>{sta.base_stat}</li>
                    </div>
                  );
                })}
              </ul>
              <button onClick={prevPoke}>Previous</button>
              <button onClick={nextPoke}>Next</button>
            </>
          }
        </div>
        <div>
          <h1>Your favoutrite</h1>
          {fav.length > 0 ? (
            <FavPoke fav={fav} />
          ) : (
            <div className="flex h-full justify-center items-center">
              <p>No favourite pokemon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
