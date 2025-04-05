interface IProps {
  title: string;
  description: string;
  createdAt: string;
}

const AnnouncementsCard = ({ description, title, createdAt }: IProps) => {
  return (
    <li className="relative p-6 rounded-2xl bg-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl w-full max-w-3xl mx-auto mb-6">
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#319DC4] rounded-l-xl"></div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900 hover:text-[#FFA41F] transition-all duration-300 ease-in-out">
          {title}
        </h3>
      </div>
      <p className="text-gray-700 mt-2 text-sm md:text-base line-clamp-3">
        {description}
      </p>
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <div className="flex items-center">
          <span className="text-[#FFA41F] font-medium">Date:</span>
          <span className="ml-1">{createdAt}</span>
        </div>
      </div>
    </li>
  );
};

export default AnnouncementsCard;
