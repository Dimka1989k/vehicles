import { VehicleMake, VehicleModel } from "@/types/api";

// Функція для отримання списку виробників
export const fetchMakes = async (): Promise<VehicleMake[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetMakesForVehicleType/car?format=json`
  );
  if (!response.ok) throw new Error("Failed to fetch vehicle makes");
  const data = await response.json();
  return data.Results;
};

// Функція для отримання моделей автомобілів за makeId і year
export const fetchModels = async (makeId: string, year: string): Promise<VehicleModel[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  if (!response.ok) throw new Error("Failed to fetch vehicle models");
  const data = await response.json();
  return data.Results;
};