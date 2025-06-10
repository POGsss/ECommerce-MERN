import { assets } from "../assets/assets"
import Title from "../components/Title"

const About = () => {
  return (
    <div className="max-w-[1280px] m-auto my-10">
      <div className="text-2xl text-center">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="m-10 flex flex-col items-center md:flex-row gap-16">
        <img className="w-full sm:max-w-full md:max-w-[450px]" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4">
          <b>Background</b>
          <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, eaque vel suscipit eum facere quod eos aliquid id sequi porro quia rerum ea alias reiciendis laboriosam voluptas. Veritatis, quae repudiandae.</p>
          <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio sed atque nam impedit, veniam minima expedita eos harum ipsa! Optio libero nostrum consectetur nemo eos, quia voluptas atque in minus.</p>
          <b>Our Mission</b>
          <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe esse, deleniti omnis ea necessitatibus voluptatem, pariatur minima fugiat alias facilis consequuntur quae incidunt ipsam eaque illo dolore. Repellendus, velit in.</p>
        </div>
      </div>

      <div className="text-2xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border border-black px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p>We meticulously select and classified each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className="border border-black px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convinience:</b>
          <p>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className="border border-black px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Customer Service:</b>
          <p>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is priority.</p>
        </div>
      </div>
    </div>
  )
}

export default About