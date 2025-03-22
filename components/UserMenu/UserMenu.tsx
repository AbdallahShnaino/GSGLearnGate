import Image from "next/image";
import Link from "next/link";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  adminRole: boolean;
}

interface UserMenuProps {
  user: User;
  showUserDetails: boolean;
  setShowUserDetails: React.Dispatch<React.SetStateAction<boolean>>;
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserMenu: React.FC<UserMenuProps> = ({
  user,
  showUserDetails,
  setShowUserDetails,
  login,
  setLogin,
}) => {
  return (
    <>
      {login ? (
        <div className="relative flex items-center gap-3">
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
            <div className="absolute border-1 border-gray-300 shadow-lg top-12 right-0 py-2 rounded-md w-60">
              <div className="pb-2 border-b-1 border-gray-300 px-2">
                <div>
                  <span className="text-sm">{user.first_name} </span>
                  <span className="text-sm">{user.last_name}</span>
                </div>
                <div className="text-sm text-[#6b7280]">{user.email}</div>
              </div>
              <ul className="py-2 border-b-1 border-gray-300">
                {user.adminRole ? (
                  <li className="hover:bg-[#f3f4f6]">
                    <Link
                      href={"/edit-profile"}
                      className="p-2 text-[#6b7280] block w-full"
                    >
                      Dashboard
                    </Link>
                  </li>
                ) : null}
                <li className="hover:bg-[#f3f4f6]">
                  <Link
                    href={"/edit-profile"}
                    className="p-2 text-[#6b7280] block w-full"
                  >
                    Edit profile
                  </Link>
                </li>
              </ul>
              <Link
                href={"/login"}
                className="p-2 text-[#6b7280] block w-full hover:bg-[#f3f4f6]"
                onClick={() => setLogin(false)}
              >
                Sign out
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link className="py-2 px-4 hover:bg-[#f9fafb]" href={"/login"}>
            Log in
          </Link>
          <Link
            className="py-2 px-4 bg-[var(--primary-color)] rounded text-white"
            href={"/signup"}
          >
            Get started
          </Link>
        </div>
      )}
    </>
  );
};

export default UserMenu;
