import { nanoid } from "nanoid";
import Banner from "@/components/Layout/Banner";
import Games from "@/components/Layout/Games";
import Promotions from "@/components/Layout/Promotions";

const Home = () => (
  <div className="w-full">
    <Banner />
    {new Array(1).fill(0).map(() => (
      <Games key={nanoid()} />
    ))}
    <Promotions />
  </div>
);

export default Home;
