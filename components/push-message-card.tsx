"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ChevronDown, Megaphone, Settings, Smartphone } from "lucide-react";
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
import { useRouter } from "next/navigation";

export interface IPushMessageCardProps {}

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

export default function PushMessageCard(props: IPushMessageCardProps) {
  const router = useRouter();

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

    router.refresh();
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
                    <ScrollArea className="h-80 w-full bg-illustration-background">
                      <div className="p-4">
                        <figure className="relative text-center text-card-foreground frame-minimal-phone h-[550px]">
                          {/* <img
                            className="frame-minimal-phone-img"
                            // src="https://s3.amazonaws.com/www-inside-design/uploads/2019/05/2-Screen-Onboarding-1-min.jpg"
                            src="/img/android_light.png"
                            alt="screenshot"
                          /> */}
                          {/* Status Bar */}
                          <div className="absolute z-10 w-full flex items-center justify-start text-muted-foreground pointer-events-none my-4 px-6 py-2 top-1.5 h-4 ">
                            <div className="text-center pl-2 flex-grow"></div>
                            <div>
                              <svg width="12" height="12" className="mr-2">
                                <path d="M0 3 L6 11 L12 3 C9 0, 3 0, 0 3"></path>
                              </svg>
                            </div>
                            <div>
                              <div className="block bg-slate-600 relative mr-1 w-[7px] h-[11px] rounded-[1px] cBhyaP"></div>
                            </div>
                            <div>28&nbsp;%</div>
                          </div>

                          {/* Clock and Notifications area */}
                          <div className="h-full frame-minimal-phone-img bg-sky-100">
                            <div className="pt-[72px] px-5 pb-[10px]">
                              <p className="text-7xl leading-[74px]">12:15</p>
                              <p className="text-base font-light leading-8">
                                Sunday, September 22
                              </p>
                            </div>

                            <div className="flex bg-card/45 rounded-sm mt-2 mx-2 overflow-hidden">
                              <div className="w-full pt-3 px-4 pb-2">
                                <div className="flex items-center">
                                  <Megaphone size={15} className="mr-2" />
                                  <div className="text-sm text-muted-foreground">
                                    Pacis Kenya
                                  </div>
                                  &nbsp;•&nbsp;&nbsp;
                                  <div className="flex tracking-normal text-sm text-muted-foreground/75">
                                    now
                                  </div>
                                  &nbsp;&nbsp;
                                  <ChevronDown size={10} />
                                </div>

                                <div className="w-full flex items-center">
                                  <div className="flex-1 order-1 text-sm">
                                    <div className="w-full text-ellipsis text-start overflow-hidden font-semibold cursor-text">
                                      Campaigns App
                                    </div>
                                    <div className="w-full mt-1 text-ellipsis text-start overflow-hidden cursor-text">
                                      Message appears here...
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </figure>
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
