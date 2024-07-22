import PokeApi from "@/services/PokeApi";
import { GetServerSideProps } from "next"
import { parseCookies, destroyCookie } from "nookies";

type PageProps = {
  name: string,
  sprite: string,
}

export default function Home(props: PageProps) {
  const {name, sprite} = props;

  const formattedName = `${name.split("")[0].toUpperCase()}${name.split("").slice(1).join("")}`

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="border border-cyan-500 rounded-xl">
        <h1 className="w-full text-center">{formattedName}</h1>
        <img src={sprite}/>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const subdomain = ctx.params?.subdomain;  

  const pokemonResponse = await PokeApi.get("/pokemon/" + subdomain);
  const data = pokemonResponse.data;


  return {
    props: {
      name: data.name,
      sprite: data.sprites.other["official-artwork"].front_default
    }
  }

}