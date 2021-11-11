import { useState, useEffect } from 'react'
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonResponse {
  count: number;
  next: string;
  previous: null;
  results: Pokemon[];
}

const ShowDetail = () => {
  const [data, setData] = useState<PokemonResponse>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=104').then((response) => {
      setData(response.data);
      setLoading(false);
    });
  }, []);


  if (loading) {
    return <p>Loading...</p>
  }

  let regex = new RegExp('https:\/\/pokeapi\.co\/api\/v2\/pokemon\/(.*)\/')

  return (
    <>
    <div className="text-center my-16">
      <p className="text-lg">POKEMON</p>
    </div>
    <div className="m-auto text-center max-w-6xl mb-20">
      <div className="grid grid-cols-6 gap-6">
        {data?.results.map((item) =>  
          <div>
            <div className="flex justify-center items-center">
            {loading && (
                        <Skeleton
                        />
                    )}
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(regex.exec(`${item.url}`))[1]}.png`} style={{ display: loading ? 'none' : undefined }}/>
            </div>
            <div>
              <p className="bg-green-200 rounded rounded-md">{loading ? <Skeleton /> : item.name}</p>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default ShowDetail