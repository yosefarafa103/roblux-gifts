import { useState } from "react";

const NavigationSection = () => {
  const tabs = [
    "informations",
    "settings",
    "social links",
    "revenue",
    "members",
    "roles",
    "affiliates",
  ];

  const [activeTab, setActiveTab] = useState("informations");

  return (
    <div className="sm:flex gap-10 mt-5">
      <div className="flex-1">
        <div className="flex flex-col bg-white">
          {tabs.map((el) => (
            <div
              key={el}
              onClick={() => setActiveTab(el)}
              className={`relative capitalize cursor-pointer px-3 py-4 transition 
                ${
                  activeTab === el
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-[#f7f7f7]"
                }`}
            >
              {activeTab === el && (
                <span className="absolute left-0 top-0 h-full w-1 flex bg-black rounded-r-md" />
              )}
              {el}
            </div>
          ))}
        </div>
      </div>
      <div className="max-sm:flex-3 max-sm:mt-5 flex-5">
        {tabs.indexOf(activeTab) !== 3 ? (
          "working on this page.."
        ) : (
          <>
            <div className="flex">
              <div className="font-semibold bg-white flex-1 p-2 text-center">
                Recurring Payout
              </div>
              <div className="font-semibold bg-white flex-1 p-2 border-b-black border-b-2 text-center">
                One Time-Payout
              </div>
            </div>
            <h4 className="my-2 font-semibold text-lg">One Time-Payout</h4>

            <div>Distributing Robux By</div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavigationSection;
