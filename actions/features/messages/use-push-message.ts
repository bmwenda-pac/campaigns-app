import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.push_message.$post>;
type RequestType = InferRequestType<
  typeof client.api.push_message.$post
>["json"];

export const usePushMessage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      console.log({ json });

      const response = await client.api.push_message.$post({ json });

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Message sent successful");
      // Todo: Invalidate message queries
    },
    onError: () => {
      toast.error("Failed to send message");
    },
  });

  return mutation;
};
