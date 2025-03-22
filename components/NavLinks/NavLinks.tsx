import Link from "next/link";

const NavLinks = () => {
  return (
    <nav>
      <ul className="flex items-center">
        <li>
          <Link
            className="py-2 px-4 hover:text-[var(--primary-color)]"
            href={"/"}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="py-2 px-4 hover:text-[var(--primary-color)]"
            href={"/about-us"}
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            className="py-2 px-4 hover:text-[var(--primary-color)]"
            href={"/contact-us"}
          >
            Contact Us
          </Link>
        </li>
        <li>
          <Link
            className="py-2 px-4 hover:text-[var(--primary-color)]"
            href={"/fq"}
          >
            FQ
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavLinks;
