import { CalculationResult, CalculationInput } from '../../shared/types/calculation';
import { supabase } from '../../lib/supabase';

export interface FavoriteItem {
  id: string;
  name: string;
  date: string;
  input: CalculationInput;
  result: CalculationResult;
}

export const favoritesService = {
  getFavorites: async (): Promise<FavoriteItem[]> => {
    try {
      const { data, error } = await supabase
        .from('crivet_favorites')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to load favorites from Supabase', error);
        return [];
      }

      return data.map((row) => ({
        id: row.id,
        name: row.name,
        date: row.created_at,
        input: row.input_data as CalculationInput,
        result: row.result_data as CalculationResult,
      }));
    } catch (e) {
      console.error('Exception loading favorites', e);
      return [];
    }
  },

  saveFavorite: async (name: string, input: CalculationInput, result: CalculationResult): Promise<FavoriteItem | null> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        console.error('User not authenticated');
        return null;
      }

      const { data, error } = await supabase
        .from('crivet_favorites')
        .insert([{ 
          user_id: session.user.id,
          name, 
          input_data: input, 
          result_data: result 
        }])
        .select()
        .single();

      if (error) {
        console.error('Failed to save to Supabase:', error);
        return null;
      }

      return {
        id: data.id,
        name: data.name,
        date: data.created_at,
        input: data.input_data as CalculationInput,
        result: data.result_data as CalculationResult,
      };
    } catch (e) {
      console.error('Exception saving favorite', e);
      return null;
    }
  },

  deleteFavorite: async (id: string): Promise<void> => {
    try {
      const { error } = await supabase.from('crivet_favorites').delete().eq('id', id);
      if (error) {
        console.error('Failed to delete favorite', error);
      }
    } catch (e) {
      console.error('Exception deleting favorite', e);
    }
  }
};
