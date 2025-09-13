import { HTMLAttributes } from "react";

export function Separator({ ...props }: HTMLAttributes<HTMLHRElement>) {
  return <hr className="border-t" {...props} />;
}
