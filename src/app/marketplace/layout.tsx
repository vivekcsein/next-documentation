import React from "react";

interface MarketplaceLayoutProps {
  children: React.ReactNode;
}
const MarketplaceLayout = ({ children }: MarketplaceLayoutProps) => {
  return <div>{children}</div>;
};

export default MarketplaceLayout;
