import React from "react";
interface IProps {
  information: string;
  details: string;
  entryRequirements: string;
  description: string;
}
const Information = ({
  information,
  details,
  entryRequirements,
  description,
}: IProps) => {
  return (
    <div>
      {information === "aboutCourse" ? (
        <div className="md:w-[750] max-md:px-3 lg:w-[970] xl:w-[1170] m-auto mt-10 mb-10">
          <h2 className="text-3xl font-bold">About Course</h2>
          <p className="mt-2.5 ">{description}</p>
        </div>
      ) : information === "courseDetails" ? (
        <div className="md:w-[750] max-md:px-3 lg:w-[970] xl:w-[1170] m-auto mt-10 mb-10">
          <h2 className="text-3xl font-bold">Course Details</h2>
          <p className="mt-2.5 ">{details}</p>
        </div>
      ) : information === "entryRequirement" ? (
        <div className="md:w-[750] max-md:px-3 lg:w-[970] xl:w-[1170] m-auto mt-10 mb-10">
          <h2 className="text-3xl font-bold">Entry Requirement</h2>
          <p className="mt-2.5 ">{entryRequirements}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Information;
