import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export function useGetMessages() {
  const query = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await client.api.message.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch accounts");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
}

// export function useGetMessages() {
//   const query = useQuery({
//     queryKey: ["messages"],
//     queryFn: async () => {
//       const response = await client.api.message.$get();

//       if (!response.ok) {
//         throw new Error("Failed to fetch accounts.");
//       }

//       const { data } = await response.json();

//       return data;
//     },
//   });

//   return query;
// }
