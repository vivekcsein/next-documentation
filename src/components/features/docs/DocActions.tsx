"use client";

import { Button, Icon } from "@/components/ui";
import { useCopyToClipboard } from "@/packages/hooks/use-copy-to-clipboard";

type DocActionsProps = {
  title: string;
  markdown: string;
};

export const DocActions = ({ title, markdown }: DocActionsProps) => {
  const page = useCopyToClipboard();
  const link = useCopyToClipboard();

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => page.copy(`# ${title}\n\n${markdown}`)} size="sm">
        <Icon name={page.copied ? "check" : "copy"} />
        {page.copied ? "Copied as Markdown" : "Copy page"}
      </Button>
      <Button
        onClick={() => link.copy(window.location.href)}
        size="sm"
        variant="secondary"
      >
        <Icon name={link.copied ? "check" : "link"} />
        {link.copied ? "Link copied" : "Copy link"}
      </Button>
    </div>
  );
};
