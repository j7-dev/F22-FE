import React from "react";
import { useAtom } from "jotai";
import { selectedSectionAtom } from "@/pages/Content/Wallet";
import historyIcon from "@/assets/images/history-icon.svg";
import passwordIcon from "@/assets/images/password-icon.svg";

const index: React.FC = () => {
  const [selectedSection, setSelectedSection] = useAtom(selectedSectionAtom);
  const handleClick = (data: string) => {
    setSelectedSection(data);
  };
  return (
    <div className="accountContainer flex flex-col ">
      <span className="text-sm font-bold text-[#2b324080] p-2.5">Account</span>
      <div className="accountListContainer flex flex-col gap-4">
        <div
          className={`h-10 gap-2.5  rounded-lg flex justify-start items-center px-2 hover:bg-[#F3F3F4] cursor-pointer ${
            selectedSection === "RolloverHistory" ? "bg-[#F3F3F4]" : ""
          }`}
          onClick={() => handleClick("RolloverHistory")}
        >
          <img src={historyIcon} alt="" />
          <span className="text-sm font-bold text-[#2B3240]">
            Rollover History
          </span>
        </div>
        <div
          className={`h-10 gap-2.5  rounded-lg flex justify-start items-center px-2 hover:bg-[#F3F3F4] cursor-pointer ${
            selectedSection === "CashHistory" ? "bg-[#F3F3F4]" : ""
          }`}
          onClick={() => handleClick("CashHistory")}
        >
          <img src={historyIcon} alt="" />
          <span className="text-sm font-bold text-[#2B3240]">Cash History</span>
        </div>
        <div
          className={`h-10 gap-2.5  rounded-lg flex justify-start items-center px-2 hover:bg-[#F3F3F4] cursor-pointer ${
            selectedSection === "ChangePassword" ? "bg-[#F3F3F4]" : ""
          }`}
          onClick={() => handleClick("ChangePassword")}
        >
          <img src={passwordIcon} alt="" />
          <span className="text-sm font-bold text-[#2B3240]">
            Change Password
          </span>
        </div>
      </div>
    </div>
  );
};
export default index;
