import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "nd_banner_closed";

export default function NationalDayBanner() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    try {
      const closed = localStorage.getItem(STORAGE_KEY);
      if (closed === "1") setOpen(false);
    } catch {}
  }, []);

  if (!open) return null;

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  return (
    <div className="w-full bg-[linear-gradient(90deg,hsl(152_60%_30%)_0%,hsl(152_60%_25%)_50%,hsl(152_60%_30%)_100%)] text-white">
      <div className="container mx-auto py-2.5 px-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span aria-hidden>🇸🇦</span>
          <p className="text-sm sm:text-base font-semibold">
            بمناسبة اليوم الوطني السعودي — خصومات خاصة على الأطباق الشعبية!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/#offers" className="text-xs sm:text-sm underline underline-offset-4 font-medium">
            استكشف العروض
          </Link>
          <button onClick={close} aria-label="إغلاق" className="/opacity-90 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
