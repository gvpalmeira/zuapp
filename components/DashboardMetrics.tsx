import React from 'react';
import { 
  Users, 
  CreditCard, 
  DollarSign, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">
          {icon}
        </div>
      </div>
      
      <div className="mt-4 flex items-center">
        <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownRight className="h-4 w-4" />
          )}
          <span className="text-sm font-medium ml-1">
            {Math.abs(change)}%
          </span>
        </div>
        <span className="text-sm text-gray-500 ml-2">vs. último mês</span>
      </div>
    </div>
  );
};

export const DashboardMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total de Clientes"
        value="2,420"
        change={12.5}
        icon={<Users className="h-6 w-6 text-primary" />}
      />
      
      <MetricCard
        title="Transações"
        value="R$ 42.5K"
        change={-2.4}
        icon={<CreditCard className="h-6 w-6 text-primary" />}
      />
      
      <MetricCard
        title="Receita"
        value="R$ 8.5K"
        change={18.2}
        icon={<DollarSign className="h-6 w-6 text-primary" />}
      />
      
      <MetricCard
        title="Crescimento"
        value="15.2%"
        change={5.7}
        icon={<TrendingUp className="h-6 w-6 text-primary" />}
      />
    </div>
  );
};