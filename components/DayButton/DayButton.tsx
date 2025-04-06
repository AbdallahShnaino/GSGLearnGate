
const DayButton = ({
  day,
  selected,
  onClick,
}: {
  day: string;
  selected: boolean;
  onClick: (day: string) => void;
}) => (
  <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      onClick(day);
    }}
    className={`px-4 py-2 rounded-md border transition-colors ${
      selected
        ? "bg-[#FFA41F] text-white border-[#FF8A00]"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
    }`}
  >
    {day.slice(0, 3)}
  </button>
);
export default DayButton;
