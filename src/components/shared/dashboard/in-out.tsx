import React from "react";

// InOut component displays incoming and outgoing amounts in a horizontal layout
// It shows two sections:
// 1. "IN" amount with green background (#BBF7D0)
// 2. "OUT" amount with red background (#FECACA)
// Each section contains a label and dollar amount
// The component uses Tailwind CSS for styling including:
// - Flex layout with gaps between elements
// - Responsive spacing (sm breakpoint)
// - Rounded corners and padding on labels
// - Semi-bold font weights
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
