import { CalculationInput, CalculationResult } from '../../shared/types/calculation';

export interface HistoryItem {
  id: string;
  date: string;
  input: CalculationInput;
  result: CalculationResult;
}

const HISTORY_KEY = 'crivet_history';
const MAX_HISTORY_ITEMS = 50;

export const historyService = {
  getHistory: (): HistoryItem[] => {
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load history', e);
      return [];
    }
  },

  addHistory: (input: CalculationInput, result: CalculationResult): void => {
    try {
      const history = historyService.getHistory();
      const newItem: HistoryItem = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        input,
        result,
      };
      
      const newHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (e) {
      console.error('Failed to save to history', e);
    }
  },

  clearHistory: (): void => {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (e) {
      console.error('Failed to clear history', e);
    }
  }
};
