import Link from "next/link";
import { SearchTrigger } from "@/components/features/search/SearchTrigger";
import { buttonVariants } from "@/components/ui/button/Button";

const NotFound = () => (
  <div className="container-page flex flex-col items-center py-28 text-center">
    <p className="text-sm font-semibold text-primary">404</p>
    <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
      We couldn’t find that page
    </h1>
    <p className="mt-3 max-w-md text-muted-foreground">
      The guide may have moved or the link is mistyped. Search for what you
      need, or browse everything.
    </p>
    <div className="mt-8 flex w-full flex-col items-center gap-4">
      <SearchTrigger variant="hero" />
      <Link className={buttonVariants({ variant: "ghost" })} href="/docs">
        Browse all guides
      </Link>
    </div>
  </div>
);

export default NotFound;
