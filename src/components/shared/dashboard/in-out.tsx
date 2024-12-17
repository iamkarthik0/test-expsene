
import React from "react";


const InOut = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        {/* --------------------------AMOUNT-------------------------- */}
        <div className="flex gap-4 items-center  ">
          <div className="flex gap-2 sm:gap-3 justify-center items-center  h5">
            <h1 className="py-2 px-2 bg-[#BBF7D0] font-semibold  rounded-md text-black">
              IN{" "}
            </h1>{" "}
            <span className=" font-medium ">$54564545</span>
          </div>

          <div className="flex gap-2 sm:gap-3 justify-center items-center">
            <h1 className="py-2 px-3 text-black font-semibold bg-[#FECACA]  rounded-md ">
              OUT{" "}
            </h1>{" "}
            <span className="font-medium ">$54564545</span>
          </div>
        </div>
        {/* -----------------------SWITCH---------------------- */}
      
  
      </div>
    </>
  );
};

export default InOut;
