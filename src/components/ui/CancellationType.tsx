import { CheckCircleIcon } from "@/components/icons/CheckCircle";
import { XCircleIcon } from "@/components/icons/XCircle";

interface CancellationTypeProps {
  refundable?: boolean;
}

export function CancellationType({ refundable }: CancellationTypeProps) {
  if (refundable) {
    return (
      <div className="flex items-center gap-2 -mt-[5px]">
        <div className="stroke-primary w-3 h-3">
          <CheckCircleIcon />
        </div>

        <span className="text-primary">Cancelamento gratuito</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 -mt-[5px]">
      <div className="stroke-red-custom w-3 h-3">
        <XCircleIcon />
      </div>

      <span className="text-red-custom">Multa de cancelamento</span>
    </div>
  );
}
