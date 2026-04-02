import ProgramDetail from "@/components/pages/programs/ProgramDetail";
import { PROGRAMS_DATA } from "@/lib/store";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return PROGRAMS_DATA.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = PROGRAMS_DATA.find((p) => p.id === slug);
  if (!program) return { title: "Program Not Found" };
  return {
    title: `${program.title} | Adele Empowerment Foundation`,
    description: program.shortDesc,
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = PROGRAMS_DATA.find((p) => p.id === slug);
  if (!program) notFound();
  return (
    <main>
      <ProgramDetail program={program} />
    </main>
  );
}
