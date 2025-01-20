import { TempFormat } from "@/lib/format";
import { Button } from "./ui/button";


interface ToggleFormatTempProps {
  tempFormat: TempFormat;
  setTempFormat: (format: TempFormat) => void;
  className?: string;
}

const ToggleFormatTemp = ({
  setTempFormat,
  tempFormat,
  className,
}: ToggleFormatTempProps) => {
  return (
    <div className={className}>
      <Button
        onClick={() => setTempFormat("c")}
        className="rounded-e-none"
        variant={tempFormat === "c" ? "default" : "secondary"}
        size="sm"
      >
        C
      </Button>
      <Button
        onClick={() => setTempFormat("f")}
        className="rounded-s-none"
        variant={tempFormat === "f" ? "default" : "secondary"}
        size="sm"
      >
        F
      </Button>
    </div>
  );
};

export default ToggleFormatTemp;
