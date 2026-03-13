import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden flex flex-col">
        <TopBar />
        <div className="flex-1 max-w-7xl mx-auto p-6 md:p-8 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

