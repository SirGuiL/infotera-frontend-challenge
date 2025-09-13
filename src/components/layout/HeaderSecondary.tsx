import { useRouter } from "next/navigation";

import { HomeIcon } from "@/components/icons/Home";
import { SigninIcon } from "@/components/icons/Signin";

export function HeaderSecondary() {
  const router = useRouter();

  return (
    <div className="bg-white w-full py-[17px] flex justify-center">
      <div className="flex justify-between px-4 md:px-16 max-w-360 w-full">
        <h1 className="font-bold text-xl text-default-text">infotravel</h1>

        <div className="flex items-center gap-4.5">
          <button
            className="flex items-center cursor-pointer gap-2"
            onClick={() => router.push("/")}
          >
            <div className="stroke-caption h-3 w-3">
              <HomeIcon />
            </div>

            <span className="font-medium text-caption text-sm">
              Página Inicial
            </span>
          </button>

          <button className="flex items-center cursor-pointer gap-2">
            <div className="stroke-caption h-3 w-3">
              <SigninIcon />
            </div>

            <span className="font-medium text-caption text-sm">
              Iniciar Sessão
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
