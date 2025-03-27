import { getLateSubmissionsCount } from "@/services/submission";
import { Warning } from "@phosphor-icons/react/dist/ssr";

export default async function LateSubmissionsCard() {
  const count = await getLateSubmissionsCount(13);
  return (
    <div className="bg-white border border-[#FFA41F]/30 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-600 text-sm">Late Submissions</h3>
        <div className="bg-red-100 p-2 rounded-full">
          <Warning size={20} weight="fill" className="text-red-600" />
        </div>
      </div>
      <p className="text-2xl font-bold text-[#FFA41F] mt-2">{count}</p>
      <div className="flex items-center mt-1 text-sm text-gray-500">
        <span>From 3 different tasks</span>
      </div>
    </div>
  );
}
