import FooterWithSocialLinks from "../../components/Footer";
import GetStarted from "../../components/GetStarted";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import placeHolder from "../../assets/images/placeholder.jpg"

import { MdDirectionsBoat } from "react-icons/md";
import { FaWarehouse } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { FaFacebook,FaInstagram,FaTwitter } from "react-icons/fa";
// import PageNotFound from "../../components/PageNotFound";


export default function About() {
  return (
    <div className="bg-slate-100">
      <Navbar />
      {/* <h1>About</h1> */}

      {/* How can we help section  */}

      <div className="flex flex-col justify-center items-center bg-slate-100 flex-wrap min-h-screen relative">
        <div className="flex flex-col gap-5 items-center justify-center m-5">
          <h1 className="font-bold text-xl text-orange-600 ">How can we help you ?</h1>
          <p className="lg:w-2/3">ESAMAN is a national logistic and courier company with largest domestic distribution network in the country. We let you to exercise full control and visibility of your packages through dedicated Relationship Managers (RMs) and Self-Service Portals (SSP).</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 lg:w-2/3">
          <div className="bg-white flex flex-col w-80 gap-4 p-5 hover:shadow-lg transition delay-150" >
            <MdDirectionsBoat className="text-orange-600 text-6xl" />
            <h2 className="font-bold text-2xl">Cargo</h2>
            <p>We work closely with our partner freight forwarders to bring any cargo merchandise from anywhere in the world to Nepal.</p>
          </div>
          <div className="bg-white flex flex-col w-80 gap-4 p-5 hover:shadow-lg transition delay-150" >
            <FaWarehouse className="text-orange-600 text-6xl" />
            <h2 className="font-bold text-2xl">Logistics & warehousing</h2>
            <p>We provide complex logistics management that includes warehousing, inventory control, cold chain, project logistics, aid delivery, etc.</p>
          </div>
          <div className="bg-white flex flex-col w-80 gap-4 p-5 hover:shadow-lg transition delay-150" >
            <FaTruck className="text-orange-600 text-6xl" />
            <h2 className="font-bold text-2xl">Transport</h2>
            <p>We operate our own fleet to provide a range of reliable transport & trucking staff, vehicles and solutions that meet your business needs.</p>
          </div>
          <div className="bg-white flex flex-col w-80 gap-4 p-5 hover:shadow-lg transition delay-150" >
            <FaTruck className="text-orange-600 text-6xl" />
            <h2 className="font-bold text-2xl">Transport</h2>
            <p>We operate our own fleet to provide a range of reliable transport & trucking staff, vehicles and solutions that meet your business needs.</p>
          </div>
          <div className="bg-white flex flex-col w-80 gap-4 p-5 hover:shadow-lg transition delay-150" >
            <FaTruck className="text-orange-600 text-6xl" />
            <h2 className="font-bold text-2xl">Transport</h2>
            <p>We operate our own fleet to provide a range of reliable transport & trucking staff, vehicles and solutions that meet your business needs.</p>
          </div>
          <div className="bg-white flex flex-col w-80 gap-4 p-5 hover:shadow-lg transition delay-150" >
            <FaTruck className="text-orange-600 text-6xl" />
            <h2 className="font-bold text-2xl">Transport</h2>
            <p>We operate our own fleet to provide a range of reliable transport & trucking staff, vehicles and solutions that meet your business needs.</p>
          </div>
        </div>
      </div>

      
      {/* Meet Our Team   */}

<div className="flex flex-col gap-10 my-10 justify-center items-center bg-slate-100 flex-wrap min-h-screen relative">
  <h1 className="font-bold text-xl text-orange-600 ">Meet Our Team </h1>
  <div className="flex flex-wrap justify-center items-center gap-5 lg:w-2/3">
    <div className="bg-white flex flex-col items-center w-80 gap-4 p-5 hover:shadow-lg transition delay-150" >
      <img src={placeHolder} alt="teamMember1" className="rounded-3xl" />
      <h2 className="font-bold text-2xl">Dipit </h2>
      <p>Founder & CEO - ESAMAN </p>
      <div className="flex gap-5 text-lg text-orange-600 cursor-pointer">
        <Link to="">
          <FaFacebook />
        </Link>
        <Link to="">
          <FaInstagram />
        </Link>
        <Link to="">
          <FaTwitter />
        </Link>
      </div>
    </div>
    <div className="bg-white flex flex-col items-center w-80 gap-4 p-5 hover:shadow-lg transition delay-150" >
      <img src={placeHolder} alt="teamMember1" className="rounded-3xl" />
      <h2 className="font-bold text-2xl">Dipit </h2>
      <p>Founder & CEO - ESAMAN </p>
      <div className="flex gap-5 text-lg text-orange-600 cursor-pointer">
        <Link to="">
          <FaFacebook />
        </Link>
        <Link to="">
          <FaInstagram />
        </Link>
        <Link to="">
          <FaTwitter />
        </Link>
      </div>
    </div>
    <div className="bg-white flex flex-col items-center w-80 gap-4 p-5 hover:shadow-lg transition delay-150" >
      <img src={placeHolder} alt="teamMember1" className="rounded-3xl" />
      <h2 className="font-bold text-2xl">Dipit </h2>
      <p>Founder & CEO - ESAMAN </p>
      <div className="flex gap-5 text-lg text-orange-600 cursor-pointer">
        <Link to="">
          <FaFacebook />
        </Link>
        <Link to="">
          <FaInstagram />
        </Link>
        <Link to="">
          <FaTwitter />
        </Link>
      </div>
    </div>
   
  </div>
</div> 

{/* <PageNotFound /> */}

      <GetStarted />
      <FooterWithSocialLinks />
    </div>
  );
}
