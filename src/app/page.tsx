"use client";

import { useState, useEffect } from "react";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Link from "next/link";
import { fetchMakes } from "@/utils/api";

export default function Home() {
  const [makes, setMakes] = useState<{ id: string; name: string }[]>([]);
  const [makeId, setMakeId] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => (2015 + i).toString());

  useEffect(() => {
    const getMakes = async () => {
      try {
        const fetchedMakes = await fetchMakes();
        setMakes(
          fetchedMakes.map((make) => ({
            id: make.MakeId.toString(),
            name: make.MakeName,
          }))
        );
      } catch (err) {
        setError("Failed to fetch vehicle makes.");
        console.error("Error fetching makes:", err);
      }
    };

    getMakes();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Car Dealer App</h1>
        <p className="text-lg text-gray-600 mb-6">
          Find your dream car by selecting its make and model year!
        </p>
        {error ? (
          <p className="text-red-500">{error}</p> 
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <Dropdown
              label="Vehicle Make"
              options={makes}
              value={makeId}
              onChange={(e) => setMakeId(e.target.value)}
            />
            <Dropdown
              label="Model Year"
              options={years.map((year) => ({ id: year, name: year }))}
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <Link href={`/result/${makeId}/${year}`}>
              <Button disabled={!makeId || !year}>Next</Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}