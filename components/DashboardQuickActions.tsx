import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserPlus, 
  CreditCard,
  FileText,
  BarChart2,
  ArrowRight
} from 'lucide-react';

interface DashboardQuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

const QuickAction: React.FC<DashboardQuickActionProps> = ({ 
  title, 
  description, 
  icon,
  path 
}) => {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate(path)}
      className="w-full p-4 bg-white rounded-lg border border-gray-200 hover:border-primary/50 hover:shadow-sm transition-all duration-200 text-left"
    >
      <div className="flex items-start gap-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <ArrowRight className="h-5 w-5 text-gray-400" />
      </div>
    </button>
  );
};

export const DashboardQuickActions: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-6">Ações Rápidas</h2>
      
      <div className="space-y-4">
        <QuickAction
          title="Novo Estabelecimento"
          description="Cadastre um novo estabelecimento"
          icon={<UserPlus className="h-5 w-5 text-primary" />}
          path="/merchants/register"
        />
        
        <QuickAction
          title="Nova Transação"
          description="Registre uma nova transação"
          icon={<CreditCard className="h-5 w-5 text-primary" />}
          path="/payments/transactions"
        />
        
        <QuickAction
          title="Gerar Relatório"
          description="Crie um novo relatório"
          icon={<FileText className="h-5 w-5 text-primary" />}
          path="/reports"
        />
        
        <QuickAction
          title="Análise de Vendas"
          description="Visualize métricas de vendas"
          icon={<BarChart2 className="h-5 w-5 text-primary" />}
          path="/reports/realtime"
        />
      </div>
    </div>
  );
};