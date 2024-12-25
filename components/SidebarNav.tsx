import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  DollarSign,
  ArrowLeftRight,
  RefreshCw,
  ScrollText,
  BarChart3,
  Settings,
  ChevronDown,
  Store,
  Users,
  CreditCard,
  Smartphone,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/hooks/useSidebarStore';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    path: '/',
  },
  /*{
    label: 'Estabelecimentos',
    icon: <Store className="h-5 w-5" />,
    children: [
      { label: 'Lista de Estabelecimentos', path: '/merchants' },
      { label: 'Cadastrar Estabelecimento', path: '/merchants/register' },
    ],
  },
  {
    label: 'Representantes',
    icon: <Users className="h-5 w-5" />,
    children: [
      { label: 'Lista de Representantes', path: '/representatives' },
      { label: 'Cadastrar Representante', path: '/representatives/new' },
      { label: 'Comissões', path: '/representatives/commissions' },
    ],
  },
  {
    label: 'Planos e Tarifas',
    icon: <DollarSign className="h-5 w-5" />,
    children: [
      { label: 'Empresas de Pagamentos', path: '/companies' },
      { label: 'Planos de Taxas', path: '/plans' },
      { label: 'Cadastrar Tabelas', path: '/register' },
      { label: 'Comparar Taxas', path: '/compare' },
    ],
  },
  {
    label: 'Pagamentos',
    icon: <CreditCard className="h-5 w-5" />,
    children: [
      { label: 'Transações', path: '/payments/transactions' },
      { label: 'Antecipações', path: '/payments/anticipations' },
      { label: 'Transferências', path: '/payments/transfers' },
    ],
  },
  {
    label: 'Transações',
    icon: <ArrowLeftRight className="h-5 w-5" />,
    children: [
      { label: 'Histórico de transações', path: '/transactions' },
      { label: 'Antecipação', path: '/anticipation' },
      { label: 'Disputas', path: '/disputes' },
      { label: 'Extrato de Liquidação', path: '/settlement' },
    ],
  },
  {
    label: 'Transferências',
    icon: <RefreshCw className="h-5 w-5" />,
    children: [
      { label: 'Extrato', path: '/transfers/statement' },
      { label: 'Histórico de transferências', path: '/transfers/history' },
    ],
  },
  {
    label: 'Equipamentos',
    icon: <Smartphone className="h-5 w-5" />,
    children: [
      { label: 'Solicitar Equipamento', path: '/devices/request' },
      { label: 'Cadastrar Equipamentos', path: '/devices/register' },
      { label: 'Gestão de Estoque', path: '/devices/inventory' },
      { label: 'Sistema de Manutenção', path: '/devices/maintenance' },
    ],
  },
  {
    label: 'Cobranças',
    icon: <ScrollText className="h-5 w-5" />,
    children: [
      { label: 'Banking', path: '/banking' },
      { label: 'Boletos emitidos', path: '/invoices' },
    ],
  },
  {
    label: 'Relatórios',
    icon: <BarChart3 className="h-5 w-5" />,
    children: [
      { label: 'Comissões', path: '/reports/commissions' },
      { label: 'Tempo Real', path: '/reports/realtime' },
      { label: 'Churn Estabelecimentos', path: '/reports/churn' },
    ],
  },
  {
    label: 'Central de Ajuda',
    icon: <HelpCircle className="h-5 w-5" />,
    children: [
      { label: 'FAQ', path: '/help/faq' },
      { label: 'Tutoriais', path: '/help/tutorials' },
      { label: 'Suporte', path: '/help/support' },
    ],
  },
  {
    label: 'Configurações',
    icon: <Settings className="h-5 w-5" />,
    path: '/settings',
  },*/
];

export const SidebarNav: React.FC = () => {
  const { isExpanded } = useSidebarStore();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleItem = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <nav className="flex-1 py-4 overflow-y-auto">
      <ul className="space-y-2 px-3">
        {navItems.map((item) => (
          <li key={item.label} className="py-1">
            {item.path ? (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md text-gray-700',
                    'hover:bg-gray-100 transition-colors duration-200',
                    isActive && 'bg-primary/10 text-primary',
                    !isExpanded && 'justify-center'
                  )
                }
                title={!isExpanded ? item.label : undefined}
              >
                {item.icon}
                {isExpanded && <span>{item.label}</span>}
              </NavLink>
            ) : (
              <div className="space-y-1">
                <button
                  onClick={() => toggleItem(item.label)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-md text-gray-700',
                    'hover:bg-gray-100 transition-colors duration-200',
                    !isExpanded && 'justify-center'
                  )}
                  title={!isExpanded ? item.label : undefined}
                >
                  {item.icon}
                  {isExpanded && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform duration-200',
                          expandedItems.includes(item.label) && 'rotate-180'
                        )}
                      />
                    </>
                  )}
                </button>
                {isExpanded && expandedItems.includes(item.label) && item.children && (
                  <ul className="pl-8 space-y-0.5">
                    {item.children.map((child) => (
                      <li key={child.path}>
                        <NavLink
                          to={child.path}
                          className={({ isActive }) =>
                            cn(
                              'group flex items-center py-2 px-3 rounded-md text-sm text-gray-700',
                              'hover:bg-gray-100 hover:font-medium transition-all duration-200',
                              isActive && 'bg-primary/10 text-primary font-medium'
                            )
                          }
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2 group-hover:bg-primary transition-colors duration-200" />
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};