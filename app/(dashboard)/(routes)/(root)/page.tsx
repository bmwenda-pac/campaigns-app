"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PushMessage from "@/components/push-message-card";

const formSchema = z.object({
  title: z.string().min(1, { message: "Please add a title." }),
  message: z.string().min(1, { message: "Message is too short." }),
});

export interface IDashboardPageProps {}

export default function DashboardPage(props: IDashboardPageProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values: values });
  }

  return (
    <main className="w-full h-full flex flex-col py-6 px-3 md:px-6 lg:px-24 space-y-4 overflow-y-auto">
      {/* Main Title */}
      {/* <BreadcrumbNav title={"Push-message"} /> */}

      {/* Message push area */}
      <PushMessage />

      <div className="mt-10" />
    </main>
  );
}

// <main className="w-full h-full bg-background">
//   <div className="w-full h-full relative flex flex-col p-6 gap-4">
//     {/* Title */}
//     <div className="w-full flex items-center justify-between">
//       <p className="text-2xl lg:text-4xl font-semibold">Push-message</p>
//       <Avatar>
//         <AvatarImage src={"/img/avatar.png"} />
//         <AvatarFallback>BM</AvatarFallback>
//       </Avatar>
//     </div>
//     <Separator className="w-full" />
//     {/* Content */}
//     <div className="w-full h-full flex flex-col">
//       {/* Form Area */}
//       <div className="w-full h-full flex flex-col my-8">
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-10 max-w-[450px]"
//           >
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Title</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Type title here..."
//                       {...field}
//                       className="h-10"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="message"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Message</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Type message here..."
//                       {...field}
//                       className="min-h-40"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="w-full flex gap-4">
//               {/* <Button variant={"outline"}>Save as Draft</Button> */}
//               <NextuiButton radius={"sm"}>Save as Draft</NextuiButton>
//               <Button type="submit">
//                 Send
//                 <SendHorizonal className="size-4 ml-2" />
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>

//     {/* Mockup Illustration */}
//     <div className="absolute right-6 top-24">
//       <div className="relative hidden lg:flex flex-col w-[250px] h-[500px] bg-primary/70 rounded-3xl py-20 px-2.5">
//         <div className="absolute left-1/2 top-5">
//           <div className="-translate-x-1/2">
//             <svg
//               width="80"
//               height="24"
//               viewBox="0 0 80 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <rect
//                 width="80"
//                 height="24"
//                 rx="12"
//                 fill="white"
//                 fillOpacity="0.3"
//               />
//               <g filter="url(#filter0_f_2882_289)">
//                 <path
//                   d="M74.4348 11.6471C74.4348 12.435 74.2818 13.2152 73.9847 13.9432C73.6875 14.6711 73.252 15.3326 72.7029 15.8897C72.1538 16.4469 71.502 16.8888 70.7846 17.1903C70.0672 17.4919 69.2983 17.6471 68.5217 17.6471C67.7452 17.6471 66.9763 17.4919 66.2589 17.1903C65.5415 16.8888 64.8897 16.4469 64.3406 15.8897C63.7915 15.3326 63.356 14.6711 63.0588 13.9432C62.7616 13.2152 62.6087 12.435 62.6087 11.6471H65.1613C65.1613 12.0949 65.2482 12.5383 65.4171 12.952C65.586 13.3657 65.8335 13.7416 66.1456 14.0582C66.4576 14.3748 66.828 14.626 67.2358 14.7974C67.6435 14.9687 68.0804 15.0569 68.5217 15.0569C68.963 15.0569 69.4 14.9687 69.8077 14.7974C70.2154 14.626 70.5859 14.3748 70.8979 14.0582C71.21 13.7416 71.4575 13.3657 71.6264 12.952C71.7953 12.5383 71.8822 12.0949 71.8822 11.6471H74.4348Z"
//                   fill="url(#paint0_linear_2882_289)"
//                   fillOpacity="0.3"
//                 />
//               </g>
//               <g filter="url(#filter1_f_2882_289)">
//                 <path
//                   d="M71.6522 11.6471C71.6522 13.4014 70.2506 14.8235 68.5217 14.8235C66.7929 14.8235 65.3913 13.4014 65.3913 11.6471C65.3913 9.89274 66.7929 8.47058 68.5217 8.47058C70.2506 8.47058 71.6522 9.89274 71.6522 11.6471ZM66.469 11.6471C66.469 12.7974 67.3881 13.73 68.5217 13.73C69.6554 13.73 70.5745 12.7974 70.5745 11.6471C70.5745 10.4967 69.6554 9.56413 68.5217 9.56413C67.3881 9.56413 66.469 10.4967 66.469 11.6471Z"
//                   fill="#2C2C2C"
//                 />
//               </g>
//               <g filter="url(#filter2_f_2882_289)">
//                 <ellipse
//                   cx="68.5218"
//                   cy="10.2353"
//                   rx="1.04348"
//                   ry="0.352941"
//                   fill="#616198"
//                 />
//               </g>
//               <g filter="url(#filter3_f_2882_289)">
//                 <ellipse
//                   cx="68.5217"
//                   cy="12.3529"
//                   rx="0.347826"
//                   ry="0.352941"
//                   fill="#1D6FAB"
//                 />
//               </g>
//               <defs>
//                 <filter
//                   id="filter0_f_2882_289"
//                   x="59.6087"
//                   y="8.64706"
//                   width="17.8261"
//                   height="12"
//                   filterUnits="userSpaceOnUse"
//                   colorInterpolationFilters="sRGB"
//                 >
//                   <feFlood floodOpacity="0" result="BackgroundImageFix" />
//                   <feBlend
//                     mode="normal"
//                     in="SourceGraphic"
//                     in2="BackgroundImageFix"
//                     result="shape"
//                   />
//                   <feGaussianBlur
//                     stdDeviation="1.5"
//                     result="effect1_foregroundBlur_2882_289"
//                   />
//                 </filter>
//                 <filter
//                   id="filter1_f_2882_289"
//                   x="64.3913"
//                   y="7.47058"
//                   width="8.26086"
//                   height="8.35294"
//                   filterUnits="userSpaceOnUse"
//                   colorInterpolationFilters="sRGB"
//                 >
//                   <feFlood floodOpacity="0" result="BackgroundImageFix" />
//                   <feBlend
//                     mode="normal"
//                     in="SourceGraphic"
//                     in2="BackgroundImageFix"
//                     result="shape"
//                   />
//                   <feGaussianBlur
//                     stdDeviation="0.5"
//                     result="effect1_foregroundBlur_2882_289"
//                   />
//                 </filter>
//                 <filter
//                   id="filter2_f_2882_289"
//                   x="66.4783"
//                   y="8.88235"
//                   width="4.08696"
//                   height="2.70587"
//                   filterUnits="userSpaceOnUse"
//                   colorInterpolationFilters="sRGB"
//                 >
//                   <feFlood floodOpacity="0" result="BackgroundImageFix" />
//                   <feBlend
//                     mode="normal"
//                     in="SourceGraphic"
//                     in2="BackgroundImageFix"
//                     result="shape"
//                   />
//                   <feGaussianBlur
//                     stdDeviation="0.5"
//                     result="effect1_foregroundBlur_2882_289"
//                   />
//                 </filter>
//                 <filter
//                   id="filter3_f_2882_289"
//                   x="67.1739"
//                   y="11"
//                   width="2.69565"
//                   height="2.70587"
//                   filterUnits="userSpaceOnUse"
//                   colorInterpolationFilters="sRGB"
//                 >
//                   <feFlood floodOpacity="0" result="BackgroundImageFix" />
//                   <feBlend
//                     mode="normal"
//                     in="SourceGraphic"
//                     in2="BackgroundImageFix"
//                     result="shape"
//                   />
//                   <feGaussianBlur
//                     stdDeviation="0.5"
//                     result="effect1_foregroundBlur_2882_289"
//                   />
//                 </filter>
//                 <linearGradient
//                   id="paint0_linear_2882_289"
//                   x1="68.5217"
//                   y1="5.64706"
//                   x2="68.5217"
//                   y2="17.6471"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop
//                     offset="0.34375"
//                     stopColor="#6D4767"
//                     stopOpacity="0"
//                   />
//                   <stop offset="1" stopColor="#6D4767" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </div>
//         </div>

//         <div className="w-full flex flex-col items-center py-4 space-y-2 text-primary-foreground">
//           <p className="text-5xl font-light">09:15</p>
//           <p className="text-lg"> Thur, 05 Aug</p>
//         </div>

//         <Card className="flex flex-col rounded-lg">
//           <CardHeader className="w-full gap-6 p-6">
//             <div className="w-full flex flex-col space-y-[6px]">
//               <div className="w-full flex items-center justify-center space-y-2">
//                 <Wallet className="size-6 mr-2" />
//                 <p className="text-sm font-medium truncate">
//                   Affordable Insurance At Your Finger Tips
//                 </p>
//               </div>

//               <div className="w-full space-y-[5px]">
//                 <div className="w-full h-3 bg-border rounded-lg animate-pulse" />
//                 <div className="w-5/6 h-3 bg-border rounded-lg animate-pulse" />
//                 <div className="w-full h-3 bg-border rounded-lg animate-pulse" />
//                 <div className="w-3/4 h-3 bg-border rounded-lg animate-pulse" />
//               </div>
//             </div>
//           </CardHeader>
//           <CardFooter className="w-full flex flex-col px-6 pb-6">
//             <div className="w-full flex justify-between">
//               <div className="flex items-center gap-[6px]">
//                 <div className="w-[10px] h-[10px] border border-[#38BDF8] rounded-full" />
//                 <p className="text-xs text-muted-foreground">Pacis Kenya</p>
//               </div>
//               <p className="text-xs text-muted-foreground">Sent Aug 2024</p>
//             </div>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   </div>
// </main>
