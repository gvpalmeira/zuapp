import React from 'react';
import { User, CreditCard, Clock, ArrowUpRight } from 'lucide-react';

const StaticHome = () => {
  return (
    <section className="flex w-full gap-6 p-6 bg-gray-50">
      <div className="flex-1 space-y-6">
        {/* Header Section */}
        <header className="space-y-6">
          {/* Greeting Box */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-2">
              <User className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-semibold">Olá, Convidado</h1>
            </div>
            <p className="text-gray-600">
              Acesse e gerencie sua conta e transações com eficiência.
            </p>
          </div>

          {/* Balance Box */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg font-medium">Saldo Total</h2>
              </div>
              <button className="text-sm text-blue-600 hover:underline">
                Ver Detalhes
              </button>
            </div>
            <p className="text-3xl font-bold">R$ 0,00</p>
          </div>
        </header>

        {/* Recent Transactions */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-medium">Transações Recentes</h2>
            </div>
            <button className="text-sm text-blue-600 hover:underline">
              Ver Todas
            </button>
          </div>

          {/* Sample Transaction Items */}
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Transação #{item}</p>
                  <p className="text-sm text-gray-600">01/01/2024</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">R$ 100,00</p>
                  <p className="text-sm text-gray-600">Pendente</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 p-6 bg-white rounded-lg shadow-sm h-fit">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">Menu Rápido</h2>
          <ArrowUpRight className="w-5 h-5 text-gray-400" />
        </div>
        
        {/* Quick Menu Items */}
        <div className="space-y-3">
          {['Meu Perfil', 'Configurações', 'Ajuda'].map((item) => (
            <button
              key={item}
              className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaticHome;