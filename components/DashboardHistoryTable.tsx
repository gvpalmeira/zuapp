import React from 'react';
import { CheckSquare, Square, Star, ExternalLink } from 'lucide-react';
import type { SimulationHistoryEntry } from '@/types/history';
import { CURRENCY_FORMAT } from '@/lib/utils';
import { formatDateString } from '@/lib/utils';

interface DashboardHistoryTableProps {
  entries: SimulationHistoryEntry[];
  selected: Set<string>;
  pinnedIds: Set<string>;
  onToggleSelection: (id: string) => void;
  onToggleSelectAll: () => void;
  onTogglePin: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export function DashboardHistoryTable({
  entries,
  selected,
  pinnedIds,
  onToggleSelection,
  onToggleSelectAll,
  onTogglePin,
  onViewDetails,
}: DashboardHistoryTableProps) {
  const allSelected = entries.length > 0 && selected.size === entries.length;

  return (
    <div className="w-full">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="w-8 sm:w-12 p-2 sm:p-3">
              <button
                onClick={onToggleSelectAll}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {allSelected ? (
                  <CheckSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Square className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
            </th>
            <th scope="col" className="w-8 sm:w-12 p-2 sm:p-3">
              <span className="sr-only">Fixar</span>
            </th>
            {/* Colunas sempre visíveis */}
            <th scope="col" className="p-2 sm:p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor
            </th>
            <th scope="col" className="p-2 sm:p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Taxa
            </th>
            <th scope="col" className="p-2 sm:p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Retorno
            </th>
            {/* Colunas que se ocultam */}
            <th scope="col" className="hidden md:table-cell p-2 sm:p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prazo
            </th>
            <th scope="col" className="hidden lg:table-cell p-2 sm:p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Juros
            </th>
            <th scope="col" className="hidden lg:table-cell p-2 sm:p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data
            </th>
            <th scope="col" className="w-8 sm:w-12 p-2 sm:p-3">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entries.map((entry) => (
            <tr
              key={entry.id}
              className={`hover:bg-gray-50 transition-colors ${
                pinnedIds.has(entry.id) ? 'bg-blue-50/50' : ''
              }`}
            >
              <td className="p-2 sm:p-3 whitespace-nowrap">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSelection(entry.id);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {selected.has(entry.id) ? (
                    <CheckSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Square className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </td>
              <td className="p-2 sm:p-3 whitespace-nowrap">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTogglePin(entry.id);
                  }}
                  className={`
                    transition-colors
                    ${pinnedIds.has(entry.id)
                      ? 'text-yellow-400 hover:text-yellow-500'
                      : 'text-gray-400 hover:text-gray-600'
                    }
                  `}
                >
                  <Star
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      pinnedIds.has(entry.id) ? 'fill-current' : ''
                    }`}
                  />
                </button>
              </td>
              {/* Colunas sempre visíveis */}
              <td className="p-2 sm:p-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                {CURRENCY_FORMAT.format(entry.result.investmentAmount)}
              </td>
              <td className="p-2 sm:p-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                {entry.result.effectiveRate.toFixed(1)}%
              </td>
              <td className="p-2 sm:p-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                {CURRENCY_FORMAT.format(entry.result.totalReturn)}
              </td>
              {/* Colunas que se ocultam */}
              <td className="hidden md:table-cell p-2 sm:p-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                {entry.result.term}m
              </td>
              <td className="hidden lg:table-cell p-2 sm:p-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                {CURRENCY_FORMAT.format(entry.result.totalInterest)}
              </td>
              <td className="hidden lg:table-cell p-2 sm:p-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                {formatDateString(entry.date)}
              </td>
              <td className="p-2 sm:p-3 whitespace-nowrap">
                <button
                  onClick={() => onViewDetails(entry.id)}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                  title="Ver detalhes"
                >
                  <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}