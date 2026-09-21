import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  DocSidebar,
  MobileDocNav,
  type SidebarCategory,
} from "@/components/features/docs/DocSidebar";
import { getCollection } from "@/packages/utils/loader";

type CollectionLayoutProps = {
  children: ReactNode;
  params: Promise<{ collection: string }>;
};

const CollectionLayout = async ({
  children,
  params,
}: CollectionLayoutProps) => {
  const { collection: key } = await params;
  const collection = getCollection(key);
  if (!collection) notFound();

  const categories: SidebarCategory[] = collection.categories.map(
    (category) => ({
      key: category.key,
      title: category.title,
      icon: category.icon,
      docs: category.docs.map(({ id, title, href }) => ({ id, title, href })),
    }),
  );
  const nav = {
    collection: { key: collection.key, title: collection.title },
    categories,
  };

  return (
    <div className="container-page py-8 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10">
      <aside className="hidden lg:block">
        <div className="sticky top-[calc(var(--header-h)+1.5rem)] max-h-[calc(100svh-var(--header-h)-3rem)] overflow-y-auto pr-2">
          <DocSidebar {...nav} />
        </div>
      </aside>

      <div className="min-w-0">
        <MobileDocNav {...nav} />
        {children}
      </div>
    </div>
  );
};

export default CollectionLayout;
