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

export interface IPushMessageProps {}

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export default function PushMessage(props: IPushMessageProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <p className="">Message</p>
            <Button size={"sm"} variant={"secondary"} className="p-0">
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
      <form action="">
        <CardContent className="flex flex-col space-y-4 p-6">
          <div className="flex flex-col space-y-6">
            <div className="md:flex gap-6">
              {/* Message input */}
              <div className="w-full max-w-sm flex flex-col space-y-6">
                <Input placeholder="Message title..." />
                <Textarea className="min-h-40" placeholder="Message title..." />
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
              <Button size={"sm"} className="bg-[#707070]">
                Save as draft
              </Button>
              <Button size={"sm"}>
                Save and run <PaperPlaneIcon className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
