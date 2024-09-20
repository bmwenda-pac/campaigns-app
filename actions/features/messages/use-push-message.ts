import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.message.$post>;
type RequestType = InferRequestType<typeof client.api.message.$post>["json"];

export const usePushMessage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      console.log({ json });

      // const response = await client.api.push_message.$post({ json });
      const formData = new FormData();
      formData.append("uploaded_file", json.csv[0]);

      try {
        const response = await fetch(
          "https://prod.api.pacisinsurance.com/3rdparty/sms/personalized?message=Have a great weekend. %23PacisTunakumind",
          {
            method: "POST",
            body: formData,
            redirect: "follow",
          }
        );

        return await response.json();
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      toast.success("Message sent successful", {
        action: {
          label: "View",
          onClick: () => console.log("View message in console!"),
        },
      });
      // Todo: Invalidate message queries
    },
    onError: () => {
      toast.error("Failed to send message");
    },
  });

  return mutation;
};
