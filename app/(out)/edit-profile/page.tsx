import EditEmailAddress from "@/components/EditEmailAddress/EditEmailAddress";
import EditPersonalInformation from "@/components/EditPersonalInformation/EditPersonalInformation";
import EditProfileImage from "@/components/EditProfileImage/EditProfileImage";
import { SkipBack } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

const EditProfilePage = () => {
  return (
    <div className="h-dvh flex flex-col gap-5 justify-center w-[85%] m-auto">
      <div>
        <Link
          href={"/"}
          className="flex items-center gap-1.5 cursor-pointer text-sm w-fit"
        >
          <SkipBack size={16} />
          Go Back
        </Link>
        <p className="text-lg mt-2">Account information</p>
      </div>
      <div className="border-2 rounded-lg p-5 flex flex-col gap-5">
        <EditProfileImage />
        <EditPersonalInformation />
        <EditEmailAddress />
      </div>
    </div>
  );
};

export default EditProfilePage;
