import { SigninIcon } from "@/components/icons/Signin";
import { HeaderButton } from "@/components/ui/HeaderButton";

export function HeaderHome() {
  return (
    <div className="flex justify-between max-w-360 w-full self-center pt-[17px] px-4 md:px-0 md:pl-[59px] md:pr-[74px]">
      <h1 className="font-bold text-xl text-default-text">infotravel</h1>

      <HeaderButton icon={<SigninIcon />} text="Iniciar Sessão" />
    </div>
  );
}
