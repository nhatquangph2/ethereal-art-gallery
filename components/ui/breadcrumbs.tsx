'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 text-sm"
      aria-label="Breadcrumb"
    >
      <Link href="/" className="text-stone-gray/60 transition-colors hover:text-gold-leaf">
        <Home className="h-4 w-4" />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 text-stone-gray/40" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-stone-gray/60 transition-colors hover:text-gold-leaf"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-stone-gray">{item.label}</span>
          )}
        </div>
      ))}
    </motion.nav>
  );
}
