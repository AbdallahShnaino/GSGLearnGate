import ConditionalLayout from "../../../../components/Layouts/ConditionalLayout/ConditionalLayout";
export default function Layout({
  children,
  activeTasksCard,
  lateSubmissionsCard,
  submissionsAwaitingReview,
  tasksList,
}: {
  children: React.ReactNode;
  activeTasksCard: React.ReactNode;
  lateSubmissionsCard: React.ReactNode;
  submissionsAwaitingReview: React.ReactNode;
  tasksList: React.ReactNode;
}) {
  return (
    <ConditionalLayout
      children={children}
      activeTasksCard={activeTasksCard}
      lateSubmissionsCard={lateSubmissionsCard}
      submissionsAwaitingReview={submissionsAwaitingReview}
      tasksList={tasksList}
      role="monitor"
    />
  );
}
