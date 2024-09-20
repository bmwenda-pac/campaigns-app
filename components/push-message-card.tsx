"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Settings, Smartphone } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { usePushMessage } from "@/actions/features/messages/use-push-message";

export interface IPushMessageProps {}

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const FormSchema = z.object({
  messageTitle: z.string().min(2, {
    message: "Message title must be at least 2 characters.",
  }),
  messageBody: z.string().min(10, {
    message: "Message body must be at least 10 characters long",
  }),
  csvFile: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "File is required."),
  messageType: z.enum(["personalized", "generic"], {
    required_error: "Please select message type",
  }),
});

export default function PushMessage(props: IPushMessageProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      messageTitle: "",
      messageBody: "",
      csvFile: undefined,
      messageType: "generic",
    },
  });

  const fileRef = form.register("csvFile");

  // Mutation for sending messages
  const sendMutation = usePushMessage();

  const isPending = sendMutation.isPending;

  function sendMessage(values: z.infer<typeof FormSchema>) {
    let payload = {
      title: values.messageTitle,
      body: values.messageBody,
      csv: values.csvFile,
    };
    console.log({ payload });
    sendMutation.mutate(payload);

    // toast("Message has been sent", {
    //   description: `${values.messageType}`,
    //   action: {
    //     label: "Undo",
    //     onClick: () => console.log("Undo"),
    //   },
    // });
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(sendMessage)} className="">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center justify-between">
                <p className="">Message</p>
                <Button
                  type="submit"
                  size={"sm"}
                  variant={"secondary"}
                  className="p-0"
                  disabled={isPending}
                >
                  <div className="relative h-full items-center flex space-x-2 pr-10 pl-2">
                    Send a test
                    <span className="bg-[#707070] flex items-center px-2 h-full absolute right-0 rounded-r-md">
                      <Settings className="size-4 text-primary-foreground" />
                    </span>
                  </div>
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-col space-y-4 p-6">
            <div className="flex flex-col space-y-6">
              <div className="md:flex gap-6">
                {/* Message input */}
                <div className="w-full lg:max-w-sm flex flex-col space-y-6">
                  <FormField
                    control={form.control}
                    name="messageTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Message title..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="messageBody"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            className="min-h-48"
                            placeholder="Message title..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="csvFile"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Upload CSV</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              placeholder="Upload csv"
                              {...fileRef}
                              onChange={(event) => {
                                field.onChange(
                                  event.target?.files?.[0] ?? undefined
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="messageType"
                    render={({ field }) => (
                      <FormItem>
                        <RadioGroup
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="generic" id="option-one" />
                            <Label htmlFor="option-one">Generic</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="personalized"
                              id="option-two"
                            />
                            <Label htmlFor="option-two">Personalized</Label>
                          </div>
                        </RadioGroup>
                      </FormItem>
                    )}
                  />
                </div>
                {/* Illustration */}
                <div className="w-full mt-6 md:mt-0">
                  <Card className="">
                    <CardHeader>
                      <CardTitle className="w-full flex items-center justify-center space-x-2">
                        <Button variant={"outline"}>
                          <Smartphone size={16} />
                        </Button>
                        <Button variant={"outline"}>
                          <Smartphone size={16} />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <Separator />
                    <ScrollArea className="h-72 w-full bg-illustration-background">
                      <div className="p-4">
                        <h4 className="mb-4 text-sm font-medium leading-none">
                          Tags
                        </h4>
                        {/* {tags.map((tag) => (
                          <>
                            <div key={tag} className="text-sm">
                              {tag}
                            </div>
                            <Separator className="my-2" />
                          </>
                        ))} */}
                      </div>
                    </ScrollArea>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
          <Separator className="mb-4" />
          <CardFooter>
            <div className="w-full grid grid-cols-1 justify-items-end">
              <div className="space-x-2">
                <Button
                  disabled={isPending}
                  size={"sm"}
                  className="bg-[#707070]"
                >
                  Save as draft
                </Button>
                <Button disabled={isPending} size={"sm"}>
                  Save and send <PaperPlaneIcon className="ml-2 size-4" />
                </Button>
              </div>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
