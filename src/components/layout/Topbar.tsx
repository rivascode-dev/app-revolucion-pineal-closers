'use client';

import { useState } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';
import { signOutAction } from '@/actions/auth';
import { ThemeToggle } from '../ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Topbar({ userEmail }: { userEmail: string }) {
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    signOutAction();
  };

  const initialLetter = userEmail ? userEmail.charAt(0).toUpperCase() : 'U';

  return (
    <header className="fixed top-0 right-0 left-20 md:left-64 h-16 bg-background/80 backdrop-blur-md border-b border-border/50 z-40 flex items-center justify-between px-6 transition-all duration-300">
      <div className="flex-1" />

      <div className="flex items-center gap-4">
        {/* Selector de Tema */}
        <ThemeToggle />

        {/* Menu de Perfil / Cuenta */}
        <DropdownMenu onOpenChange={setOpen}>
          <DropdownMenuTrigger className="flex items-center gap-2 p-1.5 rounded-xl cursor-pointer transition-all duration-300 hover:bg-accent border border-transparent hover:border-border/50 outline-none select-none">
            <div className="w-9 h-9 rounded-lg bg-linear-to-tr from-primary to-purple-500 text-primary-foreground flex items-center justify-center font-bold text-sm shadow-sm">
              {initialLetter}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-foreground/80 leading-none">Mi cuenta</p>
              <p className="text-[10px] text-muted-foreground max-w-[120px] truncate leading-normal mt-0.5">
                {userEmail}
              </p>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
                open ? 'rotate-180' : 'none'
              }`}
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 mt-2" align="end">
            <div className="px-3 py-2 text-left">
              <DropdownMenuLabel className="p-0">Conectado como</DropdownMenuLabel>
              <p className="text-xs font-medium text-foreground truncate mt-0.5">{userEmail}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-destructive focus:bg-destructive/10 focus:text-destructive gap-2.5 py-2"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
