"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/hooks/useSidebarStore';
import { SidebarNav } from './SidebarNav';

export const Sidebar: React.FC = () => {
  const { isExpanded } = useSidebarStore();

  return (
    <aside
      className={cn(
        'bg-white border-r border-gray-200',
        'transition-all duration-300 ease-in-out',
        'fixed left-0 top-16 bottom-0',
        'flex flex-col',
        isExpanded ? 'w-64' : 'w-20'
      )}
    >
      <SidebarNav />
    </aside>
  );
};