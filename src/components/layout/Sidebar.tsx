'use client';

import { LayoutDashboard, FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MENU_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Contratos', href: '/dashboard/contratos', icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 h-screen w-20 md:w-64 bg-card border-r border-border/50 z-50 flex flex-col transition-all duration-300">
      {/* Logo Container */}
      <div className="p-4 md:p-6 flex items-center gap-3 justify-center md:justify-start">
        <div className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center font-black text-lg shadow-md hover:scale-105 transition-transform duration-300">
          RP
        </div>
        <div className="hidden md:block text-left">
          <h1 className="font-extrabold text-sm tracking-tight text-foreground leading-none">
            REVOLUCIÓN PINEAL
          </h1>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-1 block">
            Closers App
          </span>
        </div>
      </div>

      {/* Navigation Label */}
      <div className="hidden md:block px-6 pt-6 pb-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          Navegación
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 md:px-4 py-2 space-y-1">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              <item.icon
                className={`h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                }`}
              />
              <span className="hidden md:inline truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="hidden md:block p-4 m-4 rounded-2xl bg-accent/50 border border-border/50">
        <span className="text-[10px] font-semibold text-muted-foreground block mb-1.5">
          Revolución Pineal v1.0
        </span>
        <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-primary rounded-full" />
        </div>
      </div>
    </aside>
  );
}
