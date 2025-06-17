import { assets } from "../assets/assets"
import NewsLetterBox from "../components/NewsLetterBox"
import Title from "../components/Title"

const Contact = () => {
  return (
    <div className="max-w-[1280px] m-auto my-10">
      <div className="text-center text-2xl">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-20">
        <div className="w-full sm:max-w-full md:max-w-[450px] flex flex-col justify-center items-end gap-6">
          <b>Store Location</b>
          <p className="text-end text-gray-500">LUCAS CHOA AVE, HARMONY HILLS 1 , BRGY MUZON, San Jose del Monte, Philippines, 1470</p>
          <p className="text-gray-500">Monday - Saturday</p>
          <b>Basic Info</b>
          <p className="text-end text-gray-500">Telephone: +63 123-456-789<br />Email: bossdapparel@gmail.com</p>
        </div>
        <img className="w-full sm:max-w-full md:max-w-[450px]" src={assets.contact_img} alt="" />
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default Contact;