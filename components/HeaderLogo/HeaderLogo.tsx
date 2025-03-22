import Image from "next/image";

const HeaderLogo = () => {
  return (
    <div className="flex items-center gap-2.5 cursor-pointer">
      <Image src={"/img/logo.webp"} alt="GSG logo" width={50} height={50} />
      <h1 className="text-xl font-bold">Gaza Sky Geeks</h1>
    </div>
  );
};

export default HeaderLogo;
