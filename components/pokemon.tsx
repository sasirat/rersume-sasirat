import { useState, FC } from 'react'
import PokemonImageSkeletonLoading from './pokemon-image-skeleton-loading';

export interface IPokemon {
  name: string;
  url: string;
}

const Pokemon: FC<IPokemon> = ({name, url}) => {
  const [loading, setLoading] = useState(true);

  let regex = new RegExp('https:\/\/pokeapi\.co\/api\/v2\/pokemon\/(.*)\/')
  const id = regex.exec(`${url}`)![1];  

  return (
    <>
    <div>
      <div className="flex justify-center items-center">
        {loading && <PokemonImageSkeletonLoading />}
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

export default Pokemon
