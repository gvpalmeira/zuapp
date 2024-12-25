import React from 'react';
import { DashboardMetrics } from '@/components/DashboardMetrics';
import { DashboardCharts } from '@/components/DashboardCharts';
import { DashboardQuickActions } from '@/components/DashboardQuickActions';
import { DashboardHistoryTable } from '@/components/DashboardHistoryTable';

export const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <DashboardMetrics />
            <DashboardCharts />
            <DashboardHistoryTable />
          </div>
          
          <div className="space-y-6">
            <DashboardQuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};