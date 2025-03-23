import Image from "next/image";
interface IProps {
  imageURL: string;
  name: string;
  email: string;
}
export default function PersonCard({ email, imageURL, name }: IProps) {
  return (
    <div className="flex items-center px-6 py-1.5 text-gray-900">
      <Image
        className="rounded-full"
        src={imageURL}
        alt="User"
        width={25}
        height={25}
      />
      <div className="ml-3">
        <div className="text-xs font-semibold">{name}</div>
        <div className="text-gray-500 text-[10px]">{email}</div>
      </div>
    </div>
  );
}
