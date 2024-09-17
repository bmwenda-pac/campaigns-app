"use client";

import {
  getGithubOAuthConsentUrl,
  getMicrosoftOAuthConsentUrl,
} from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { BsGithub, BsMicrosoft } from "react-icons/bs";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter an email address" })
    .email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Please enter valid password" }),
});

export interface ISignInPageProps {}

export default function SignInPage(props: ISignInPageProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values: values });
  }

  return (
    <main className="min-h-screen bg-white w-full flex items-center">
      {/* Brand */}
      <div className="relative hidden min-h-screen w-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0">
          <Image
            src={"/img/bg-1.jpg"}
            fill
            objectFit="cover"
            alt="background-image"
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          Pacis Kenya
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2 max-w-[400px]">
            <p className="text-sm">Our Mission</p>
            <p className="text-lg">
              &ldquo;To protect health, wealth and reputation for comfort and
              peace to society.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
      {/* Login Form */}
      <div className="px-16 mx-auto flex items-center justify-center">
        <div className="min-w-[380px]">
          <div className="w-full flex lg:hidden items-center justify-center mb-4">
            <Image
              src={"/img/Pacis-Logo.png"}
              width={100}
              height={100}
              alt="logo"
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to access dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <Button
                  onClick={async () => {
                    const res = await getMicrosoftOAuthConsentUrl();
                    if (res.url) {
                      window.location.href = res.url;
                    } else {
                      toast.error(res.error);
                    }
                  }}
                  variant={"outline"}
                  className="w-full"
                >
                  <BsMicrosoft className="mr-2 size-4" />
                  Microsoft
                </Button>
                <Button
                  onClick={async () => {
                    const res = await getGithubOAuthConsentUrl();
                    if (res.url) {
                      window.location.href = res.url;
                    } else {
                      toast.error(res.error);
                    }
                  }}
                  variant={"outline"}
                  className="w-full"
                >
                  <BsGithub className="mr-2 size-4" />
                  Github
                </Button>
              </div>
              <div className="w-full flex pt-5 pb-2 gap-1.5 items-center justify-center">
                <Separator className="flex-1" />
                <p className="text-xs uppercase">or continue with</p>
                <Separator className="flex-1" />
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="username@paciskenya.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="*******" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
