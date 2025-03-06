"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <nav className="text-gray-600 text-sm mb-4">
      <ul className="flex items-center gap-2">
        <li>
          <Link href="/" className="text-blue-500 hover:underline">
            Home
          </Link>
        </li>

        {pathSegments.length > 0 && <li className="text-gray-400">/</li>}

        {pathSegments.map((segment, index) => {
          const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          const formattedSegment =
            segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <li key={url} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-gray-500">{formattedSegment}</span>
              ) : (
                <Link href={url} className="text-blue-500 hover:underline">
                  {formattedSegment}
                </Link>
              )}
              {!isLast && <span className="text-gray-400">/</span>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
