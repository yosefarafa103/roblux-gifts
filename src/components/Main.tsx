import { useCoins } from "../context/coins.context";
import NavigationSection from "./NavigationSection";
import RobloxLogo from "./RobloxLogo";
const Main = () => {
  const { coins } = useCoins();
  return (
    <div className="py-3 sm:px-[10%] px-[2%] bg-[#eee] ">
      <h4 className="capitalize text-3xl font-bold text-gray-800">
        Configure Dinvo
      </h4>
      <div className="flex flex-col">
        <span>by gdiwbah_66</span>
        <span className="flex items-center gap-1">
          group funds:
          <RobloxLogo />
          <b> {coins.toLocaleString("en-Us")} </b>
        </span>
      </div>
      <NavigationSection />
    </div>
  );
};

export default Main;
