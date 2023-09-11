import { LikePoke } from "./LikePoke";


const FavPoke = ({fav}) => {



  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {fav?.map((data, index) => (
        <div key={index}>
          <p>{data.name}</p>
          <img src={data?.sprites?.other?.home?.front_default} alt={data?.name} />
            <LikePoke/>
        </div>
      ))}
    </div>
  );
};

export default FavPoke;
