"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const BackArrow = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 shadow hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6 text-gray-700"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
};

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <nav className="text-gray-600 text-sm mb-4 flex items-center gap-4">
      <BackArrow />
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
