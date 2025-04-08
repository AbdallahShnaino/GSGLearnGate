"use client"
import { logoutUser } from "@/controllers/actions/logoutUserAction";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  role: string;
}

interface UserMenuProps {
  user: User;
  showUserDetails: boolean;
  setShowUserDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserMenu: React.FC<UserMenuProps> = ({
  user,
  showUserDetails,
  setShowUserDetails,
}) => {
  const router = useRouter();
  const handleLogout = async () => {
      const result = await logoutUser();
      if (result.success) {
        router.push("/login");
        router.refresh(); 
      }
    };
  return (
    <div className="relative flex items-center gap-3 z-50">
      <div className="w-[40] h-[40] rounded-full overflow-hidden cursor-pointer flex justify-center items-center">
        <Image
          src={"/img/Unknown_person.jpg"}
          alt="user logo"
          width={40}
          height={40}
          onClick={() => setShowUserDetails(!showUserDetails)}
        />
      </div>
      {showUserDetails && (
        <div className="absolute border-1 border-gray-300 shadow-lg top-12 right-0 py-2 rounded-md w-60 bg-white">
          <div className="pb-2 border-b-1 border-gray-300 px-2">
            <div className="text-sm text-[#6b7280]">{user.email}</div>
          </div>
          <ul className="py-2 border-b-1 border-gray-300">
            {user.role ? (
              <li className="hover:bg-[#f3f4f6]">
                <Link
                  href={`/${user.role.toLowerCase()}`}
                  className="p-2 text-[#6b7280] block w-full"
                >
                  {user.role} Dashboard
                </Link>
              </li>
            ) : null}
          </ul>
          <button
            onClick={handleLogout}
            className=" text-left p-2 text-[#6b7280] block w-full hover:bg-[#f3f4f6]"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
