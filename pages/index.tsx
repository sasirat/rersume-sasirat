import axios from 'axios';
import { useEffect, useState } from 'react';
import Pokemon, { IPokemon } from '../components/pokemon'
import PokemonSkeletonLoading from '../components/pokemon-skeleton-loading';

interface PokemonResponse {
  count: number;
  next: string;
  previous: null;
  results: IPokemon[];
}

const Home = () => {
  const [data, setData] = useState<PokemonResponse>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=104').then((response) => {
      setData(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
    <div className="text-center my-16">
      <p className="text-lg">POKEMON</p>
    </div>
    <div className="m-auto text-center max-w-6xl mb-20">
      <div className="grid grid-cols-6 gap-6">
        {loading && (
          Array(60).fill(null).map((_, index) => <PokemonSkeletonLoading key={index} />)
          )}
        {data?.results.map(item => <Pokemon key={item.name} {...item}/>)}
      </div>
    </div>
    </>
  )
}

export default Home