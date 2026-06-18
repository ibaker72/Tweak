"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/lib/data";
import { CaseStudy } from "@/components/work/case-study";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project)
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-32 text-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            Project not found
          </h1>
          <Link
            href="/work"
            className="mt-4 inline-flex items-center gap-2 text-[13px] text-accent/80 transition-colors duration-200 hover:text-accent"
          >
            <ArrowLeft size={14} /> Back
          </Link>
        </div>
      </div>
    );

  return <CaseStudy project={project} />;
}
