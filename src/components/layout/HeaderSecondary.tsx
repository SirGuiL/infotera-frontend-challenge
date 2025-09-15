import { useRouter } from "next/navigation";

import { HomeIcon } from "@/components/icons/Home";
import { SigninIcon } from "@/components/icons/Signin";
import { HeaderButton } from "@/components/ui/HeaderButton";

export function HeaderSecondary() {
  const router = useRouter();

  return (
    <div className="bg-white w-full py-[17px] flex justify-center">
      <div className="flex justify-between px-4 md:px-16 max-w-360 w-full">
        <h1 className="font-bold text-xl text-default-text">infotravel</h1>

        <div className="flex items-center gap-4.5">
          <HeaderButton
            icon={<HomeIcon />}
            text="Página Inicial"
            onClick={() => router.push("/")}
          />

          <HeaderButton icon={<SigninIcon />} text="Iniciar Sessão" />
        </div>
      </div>
    </div>
  );
}
