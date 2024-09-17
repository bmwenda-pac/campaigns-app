import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchMicrosoftData(
  endpoint: string,
  accessToken: string
) {
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Host: "localhost:3000",
    },
  };

  console.log(`request made to ${endpoint} at: ` + new Date().toString());

  try {
    const response = await axios.get(endpoint, options);
    return await response.data;
  } catch (error: any) {
    if (error.cause && error.cause.errors) {
      const errorsArray = error.cause.errors;
      console.log(errorsArray);

      // Access individual errors
      errorsArray.forEach((err: any, index: number) => {
        console.log(`Error ${index + 1}:`, err);
      });
    } else {
      console.log("No errors array found.");
    }
  }
}
