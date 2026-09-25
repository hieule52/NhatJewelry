import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLdBreadcrumb } from "./JsonLd";

export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <>
      <JsonLdBreadcrumb items={items} />
      <nav aria-label="Breadcrumb" className={`flex items-center text-xs tracking-wider uppercase text-[var(--color-muted-foreground)] ${className}`}>
        <ol className="flex items-center flex-wrap gap-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1 || item.current;

            return (
              <li key={item.href} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-[var(--color-gold-400)] shrink-0" />
                )}
                {isLast ? (
                  <span
                    className="text-[var(--color-foreground)] font-medium truncate max-w-[200px] md:max-w-[300px]"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-[var(--color-gold-500)] transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
