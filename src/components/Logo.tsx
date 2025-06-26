import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="TrueLogiX Home">
      <Image src="/truelogix.jpg" alt="TrueLogiX logo" width={28} height={28} className="rounded-full" />
      <span className="text-xl font-bold font-headline text-foreground">
        TrueLogiX
      </span>
    </Link>
  );
}
