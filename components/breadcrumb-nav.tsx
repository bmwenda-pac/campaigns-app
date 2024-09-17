import * as React from "react";
import { Button } from "./ui/button";

export interface IBreadcrumbNavProps {
  title: string;
}

export default function BreadcrumbNav({ title }: IBreadcrumbNavProps) {
  return (
    <div className="w-full flex items-center justify-between">
      <p className="font-semibold text-2xl">{title}</p>

      <Button size={"lg"}>New Campaign</Button>
    </div>
  );
}
