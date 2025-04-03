import { notFound } from "next/navigation";

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function TaskPage({ params }: IProps) {
  const { id } = await params;

  return <h1>111</h1>;
}
