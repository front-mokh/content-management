import { useIsMobile } from "@/hooks/use-mobile";
import { Edit3 } from "lucide-react";

import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useRouter } from "next/navigation";

export default function UpdateButton({
  label,
  href,
  disabled,
  tooltipMessage,
}: {
  label: string;
  href?: string;
  disabled?: boolean;
  tooltipMessage?: string;
}) {
  const isMobile = useIsMobile();
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Button
              size={isMobile ? "icon" : "default"}
              className="flex items-center gap-2"
              onClick={href ? handleClick : undefined}
              disabled={disabled}
            >
              <Edit3 className="h-4 w-4" />
              <span className="hidden md:block">{label}</span>
            </Button>
          </div>
        </TooltipTrigger>
        {disabled && (
          <TooltipContent side="top">
            <p>{tooltipMessage}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
