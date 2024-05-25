import { BsArrowRight } from "react-icons/bs";

const Button = (props: any) => {
  return (
    <button
      type="submit"
      className="flex flex-row justify-center items-center gap-4 bg-orange-600 hover:bg-black text-white transition-all px-4 py-2 rounded-md cursor-pointer"
    >
      <a>{props.title}</a>
      {props.arrow && <BsArrowRight />}
    </button>
  );
};

export default Button;
