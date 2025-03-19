import { useIsMobile } from "@/hooks/use-mobile";
import { Trash2 } from "lucide-react";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  label,
  href,
}: {
  label: string;
  href?: string;
}) {
  const isMobile = useIsMobile();
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <Button
      variant={"destructive"}
      size={isMobile ? "icon" : "default"}
      className="flex items-center gap-2"
      onClick={href ? handleClick : undefined}
    >
      <Trash2 className="h-4 w-4" />
      <span className="hidden md:block">{label}</span>
    </Button>
  );
}
