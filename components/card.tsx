import { useState, useEffect, FC } from 'react'
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

const PokemonSkeletonLoading = () => {
  return (
    <Skeleton width={80} height={80} circle style={{ margin: '8px' }} />
  )
}

const Pokemon: FC<Pokemon> = ({name, url}) => {
  const [loading, setLoading] = useState(true);

  let regex = new RegExp('https:\/\/pokeapi\.co\/api\/v2\/pokemon\/(.*)\/')
  const id = regex.exec(`${url}`)![1];  

  return (
    <>
    <div>
      <div className="flex justify-center items-center">
        {loading && <PokemonSkeletonLoading />}
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
          onLoad={() => setLoading(false)}
        />
      </div>
      <div>
        <p className="bg-green-200 rounded rounded-md">{name}</p>
      </div>
    </div>
    </> 
  ) 
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


  return (
    <>
    <div className="text-center my-16">
      <p className="text-lg">POKEMON</p>
    </div>
    <div className="m-auto text-center max-w-6xl mb-20">
      <div className="grid grid-cols-6 gap-6">
        {loading && (
          Array(60).fill(null).map((_, index) => (
            <div key={index} className="flex justify-center items-center">
              <div>
              <PokemonSkeletonLoading />
              <Skeleton style={{ width: '100%' }}/>
              </div>
            </div> 
          ))
        )}
        {data?.results.map(item => <Pokemon key={item.name} {...item}/>)}
      </div>
    </div>
    </>
  )
}

export default ShowDetail