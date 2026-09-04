import { CalculationResult, CalculationInput } from '../../shared/types/calculation';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';

export interface FavoriteItem {
  id: string;
  name: string;
  date: string;
  input: CalculationInput;
  result: CalculationResult;
}

export type SaveFavoriteResult =
  | { ok: true; item: FavoriteItem }
  | { ok: false; reason: 'auth' | 'error' };

export const favoritesService = {
  getFavorites: async (): Promise<FavoriteItem[]> => {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from('crivet_favorites')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) return [];

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

  saveFavorite: async (name: string, input: CalculationInput, result: CalculationResult): Promise<SaveFavoriteResult> => {
    if (!isSupabaseConfigured) return { ok: false, reason: 'auth' };
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        return { ok: false, reason: 'auth' };
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

      if (error) return { ok: false, reason: 'error' };

      return {
        ok: true,
        item: {
          id: data.id,
          name: data.name,
          date: data.created_at,
          input: data.input_data as CalculationInput,
          result: data.result_data as CalculationResult,
        },
      };
    } catch (e) {
      console.error('Exception saving favorite', e);
      return { ok: false, reason: 'error' };
    }
  },

  deleteFavorite: async (id: string): Promise<void> => {
    if (!isSupabaseConfigured) return;
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
