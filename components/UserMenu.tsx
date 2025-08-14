import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useAuth } from './AuthProvider';

const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="Abrir menu do usuário" className="rounded-full focus:outline-none">
        <img
          src={user.avatarUrl || `https://ui-avatars.com/api/?background=2ecc71&color=ffffff&name=${encodeURIComponent(user.name)}`}
          alt={user.name}
          className="h-9 w-9 rounded-full border border-primary/30"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex items-center space-x-2">
            <img src={user.avatarUrl} alt={user.name} className="h-6 w-6 rounded-full" />
            <div>
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;


