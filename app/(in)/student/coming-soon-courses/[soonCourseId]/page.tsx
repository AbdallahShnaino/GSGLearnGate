import SoonCourseDetails from "@/components/SoonCourseDetails/SoonCourseDetails";
import {
  getCoursesByStudentId,
  getJoiningRequestStatus,
} from "@/src/db/queries/select";
import { getStudentIdFromCookie } from "@/app/lib/auth/getStudentIdFromCookie";

interface IProps {
  params: Promise<{ soonCourseId: string }>;
}
const page = async (props: IProps) => {
  const studentId = await getStudentIdFromCookie();
  const { soonCourseId } = await props.params;
  const courseData = await getCoursesByStudentId(Number(soonCourseId));
  const requestStatus = await getJoiningRequestStatus(
    Number(studentId),
    Number(soonCourseId)
  );

  return (
    <SoonCourseDetails
      courseData={courseData}
      studentId={studentId!}
      soonCourseId={soonCourseId}
      requestStatus={requestStatus}
    />
  );
};

export default page;
