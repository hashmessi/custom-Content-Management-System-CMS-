"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <nav
      className="flex items-center space-x-2 text-sm text-neutral-500 mb-6"
      aria-label="Breadcrumb"
    >
      <Link
        href="/admin"
        className="flex items-center hover:text-blue-600 transition-colors"
      >
        <Home className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Admin</span>
      </Link>

      {pathSegments.slice(1).map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 2).join("/")}`;
        const isLast = index === pathSegments.length - 2;

        // Capitalize and format the segment name
        const name = segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());

        return (
          <React.Fragment key={href}>
            <ChevronRight className="w-4 h-4 text-neutral-300" />
            {isLast ? (
              <span className="font-medium text-neutral-900 truncate max-w-[150px] sm:max-w-none">
                {name}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-blue-600 transition-colors"
              >
                {name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
