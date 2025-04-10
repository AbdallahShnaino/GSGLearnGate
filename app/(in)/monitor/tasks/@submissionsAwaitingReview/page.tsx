import { Clock } from "@phosphor-icons/react/dist/ssr";
import { getNotGradedSubmissionsCount } from "@/services/task";
import { STATIC_MONITOR_ID } from "@/context/keys";
export default async function SubmissionsAwaitingReview() {
  const count = await getNotGradedSubmissionsCount(STATIC_MONITOR_ID);
  return (
    <div className="bg-white border border-[#FFA41F]/30 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-600 text-sm">Submissions Awaiting Review</h3>
        <div className="bg-blue-100 p-2 rounded-full">
          <Clock size={20} weight="fill" className="text-blue-600" />
        </div>
      </div>
      <p className="text-2xl font-bold text-[#FFA41F] mt-2">{count}</p>
    </div>
  );
}
