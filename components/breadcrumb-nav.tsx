import Image from "next/image";
import { Button } from "./ui/button";

export interface IBreadcrumbNavProps {
  title: string;
  updateState: () => void;
}

export default function BreadcrumbNav({
  title,
  updateState,
}: IBreadcrumbNavProps) {
  return (
    <div className="min-h-screen relative flex flex-col items-center space-y-20">
      <div className="w-full flex items-center justify-between">
        <p className="font-semibold text-xl md:text-2xl">{title}</p>

        <Button size={"lg"} onClick={updateState}>
          New Campaign
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <h3 className="font-bold text-2xl">Create your first campaign</h3>
        <div className="flex flex-col items-center justify-center space-y-6">
          <p className="text-sm text-center text-muted-foreground max-w-lg">
            With push notifications our clients are one click away from
            revisiting our platform. It`&apos;`s the fastest and most efficient
            communication channel.
          </p>
          {/* <div className="absolute flex flex-col bottom-0">
            <Image
              alt="Mountains"
              src={"/img/Frame.png"}
              width={400}
              height={280}
            />
          </div> */}
        </div>
      </div>

      <div className="absolute flex flex-col bottom-32 md:bottom-14">
        <Image
          alt="Mountains"
          src={"/img/Frame.png"}
          width={400}
          height={280}
        />
      </div>
    </div>
  );
}
