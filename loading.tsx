import { leapfrog } from "ldrs";

leapfrog.register();

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <l-leapfrog size="40" speed="2.5" color="black"></l-leapfrog>
    </div>
  );
}
