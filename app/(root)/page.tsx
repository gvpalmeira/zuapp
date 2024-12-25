import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import { getLoggedInUser, logoutAccount } from '@/lib/user.actions';
import { SearchParamProps, AccountsResponse, Account, User } from '@/types';
import { DashboardMetrics } from '@/components/DashboardMetrics';
import { DashboardCharts } from '@/components/DashboardCharts';
import { DashboardQuickActions } from '@/components/DashboardQuickActions';
import { DashboardHistoryTable } from '@/components/DashboardHistoryTable';



const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();

  const historyTableProps = {
    entries: [], // Add your transaction entries here
    selected: new Set(), // Set of selected entry IDs
    pinnedIds: new Set(), // Set of pinned entry IDs
    onToggleSelection: () => {}, // Handler for selection toggle
    onTogglePinned: () => {}, // Handler for pin toggle
    onDeleteSelected: () => {}, // Handler for deletion
    isLoading: false // Loading state
  };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Olá,"
            user={loggedIn?.nome_completo}
            subtext="Acesse e gerencie sua conta e transações com eficiência."
          />
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <DashboardMetrics />
            <DashboardCharts />
            {/*<DashboardHistoryTable /> */}
          </div>
          
          <div className="space-y-6">
            <DashboardQuickActions />
          </div>
        </div>
      </div>

      <RightSidebar 
        user={loggedIn}
      />
    </section>
  )
}

export default Home