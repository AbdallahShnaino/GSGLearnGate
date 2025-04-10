import React from "react";
interface IProps{
  information: string,
  setInformation: (value: string) => void
}
const Navbar = ({ information, setInformation }: IProps) => {
  return (
    <div className="bg-[rgba(119,119,119,0.25)] py-3 ">
      <ul className="flex md:w-[750] lg:w-[970] xl:w-[1170] m-auto">
        <li
          onClick={() => setInformation("aboutCourse")}
          className={`py-1.5 px-4 font-bold max-sm:text-sm max-sm:text-center cursor-pointer hover:border-b-2 border-blue-400 ${
            information === "aboutCourse" ? "border-b-2" : ""
          } `}
        >
          About Course
        </li>
        <li
          onClick={() => setInformation("courseDetails")}
          className={`py-1.5 px-4 font-bold max-sm:text-sm max-sm:text-center cursor-pointer hover:border-b-2 border-blue-400 ${
            information === "courseDetails" ? "border-b-2" : ""
          } `}
        >
          Course Details
        </li>
        <li
          onClick={() => setInformation("entryRequirement")}
          className={`py-1.5 px-4 font-bold max-sm:text-sm max-sm:text-center cursor-pointer hover:border-b-2 border-blue-400 ${
            information === "entryRequirement" ? "border-b-2" : ""
          } `}
        >
          Entry Requirement
        </li>
      </ul>
    </div>
  );
};

export default Navbar;