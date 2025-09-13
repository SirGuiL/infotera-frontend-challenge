import { SigninIcon } from "@/components/icons/Signin";

export function HeaderHome() {
  return (
    <div className="flex justify-between max-w-360 w-full self-center pt-[17px] px-4 md:px-0 md:pl-[59px] md:pr-[74px]">
      <h1 className="font-bold text-xl text-default-text">infotravel</h1>

      <button className="flex items-center cursor-pointer gap-2">
        <div className="stroke-caption h-3 w-3">
          <SigninIcon />
        </div>

        <span className="font-medium text-caption text-sm">Iniciar Sessão</span>
      </button>
    </div>
  );
}
