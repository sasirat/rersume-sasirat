import Skeleton from "react-loading-skeleton"
import PokemonImageSkeletonLoading from "./pokemon-image-skeleton-loading"

const PokemonSkeletonLoading = () => {
  return (
    <div className="flex justify-center items-center">
      <div>
        <PokemonImageSkeletonLoading />
        <Skeleton style={{ width: '100%' }}/>
      </div>
    </div> 
  )
}

export default PokemonSkeletonLoading