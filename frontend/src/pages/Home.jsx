import BestSeller from "../components/BestSeller"
import Hero from "../components/Hero"
import LatestCollection from "../components/LatestCollection"
import NewsLetterBox from "../components/NewsLetterBox"
import OurPolicy from "../components/OurPolicy"

const Home = () => {
  return (
    <div className="max-w-[1280px] m-auto">
        <Hero />
        <BestSeller />
        <LatestCollection />
        <OurPolicy />
        <NewsLetterBox />
    </div>
  )
}

export default Home;