import { fetchMakes, fetchModels } from "@/utils/api";
import { VehicleModel } from "@/types/api";
import { Suspense } from "react";
import Link from "next/link";

async function VehicleModels({ makeId, year }: { makeId: string; year: string }) {
  const models: VehicleModel[] = await fetchModels(makeId, year);
  return (
    <ul className="mt-4 space-y-2">
      {models.map((model) => (
        <li key={model.Model_ID} className="p-2 border rounded">
          {model.Model_Name}
        </li>
      ))}
    </ul>
  );
}

interface PageProps {
  params: {
    makeId: string;
    year: string;
  };
}

export default async function ResultPage({ params }: PageProps) {
  const { makeId, year } = await params;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-4xl text-center">
        <h1 className="text-3xl font-bold mb-4">
          Models for Make ID: {makeId}, Year: {year}
        </h1>
        <Suspense fallback={<div>Loading vehicle models...</div>}>
          <VehicleModels makeId={makeId} year={year} />
        </Suspense>
        <Link href="/" className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Back to Home
        </Link>
      </div>
    </div>
    );
  }

export async function generateStaticParams() {
  const makes = await fetchMakes();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => (2015 + i).toString());
  const paths = makes.flatMap((make) =>
    years.map((year) => ({
      makeId: make.MakeId.toString(),
      year,
    }))
  );
  return paths;
}