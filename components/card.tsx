import { useState, useEffect } from 'react'
import axios from 'axios';

const ShowDetail = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=104').then((response) => {
      setData(response.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading</p>;
  }

  if (data === undefined) {
    return <p>Data is undefined</p>;
  }
  let regex = new RegExp('https:\/\/pokeapi\.co\/api\/v2\/pokemon\/(.*)\/')
  let result = regex.exec(`https://pokeapi.co/api/v2/pokemon/104/`)
  console.log(result)
  return (
    <>
    <div className="m-auto text-center">
      <div className="grid grid-cols-6 gap-4">
        {data.results.map((item) =>
          <div>
            <div className="flex justify-center items-center">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result[1]}.png`}/>
            </div>
            <p>{item.name}</p>
          </div>
        )
        }
      </div>
    </div>
    </>
  )
}

export default ShowDetail