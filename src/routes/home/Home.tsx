import Navbar from "../../components/Navbar.tsx";
import Button from "../../components/Button.tsx";
import FooterWithSocialLinks from "../../components/Footer.tsx";
import { Link } from "react-router-dom";
import img1 from "../../assets/images/delivary_img1.jpg";
import GetStarted from "../../components/GetStarted.tsx";

export function Home() {
  return (
    <div className="bg-slate-100">
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center lg:flex-row items-center lg:px-32 px-5 bg-backgroundColor">
        <div className="flex flex-col items-center text-center lg:text-start lg:items-start w-full lg:w-3/4 space-y-4 ">
          <h1 className="text-5xl font-semibold leading-tight mt-24">
            Nepal's national courier, cargo,
            <span className="text-orange-600">delivery and logistics </span>
            company
          </h1>
          <p>
            Nepal Can Move, your full-service courier & logistic partner, Fast.
            Secure. Reliable. You Can Count On us for Your Success and Growth.
            Experience service like never before. eSaman helps businesses move
            goods and manage their supply chain efficiently, handling tasks such
            as transportation management, warehousing, and inventory control.
          </p>
          <div className="flex gap-4">
            <Link to="contact">
              <Button title="Get Started" />
            </Link>
            <Link to="about">
              <Button title="Know More" />
            </Link>
          </div>
        </div>
        <div className="mt-20">
          <img
            src={img1}
            width={570}
            alt="Profile Image"
            className="rounded-xl"
          />
        </div>
      </div>

      <GetStarted />
      <FooterWithSocialLinks />
    </div>
  );
}
