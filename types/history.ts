import type { SimulationResult } from './index';

export interface SimulationHistoryEntry {
  id: string;
  date: Date;
  result: SimulationResult;
}

export interface SimulationHistoryState {
  entries: SimulationHistoryEntry[];
  selected: Set<string>;
  pinnedIds: Set<string>;
}