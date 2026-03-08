import React, { useState, useEffect } from 'react';
import { Save, Edit3 } from 'lucide-react';
import { useLocalNotes } from '../../hooks/useLocalNotes';
import { LocalNoteEntityType } from '../../types/notes';
import { cn } from '../../../../lib/utils';

interface NotesEditorProps {
  entityType: LocalNoteEntityType;
  entityId: string;
  className?: string;
}

export function NotesEditor({ entityType, entityId, className }: NotesEditorProps) {
  const { note, saveNote } = useLocalNotes(entityType, entityId);
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (note) {
      setContent(note.content);
    }
  }, [note]);

  const handleSave = () => {
    saveNote(content);
    setIsEditing(false);
  };

  return (
    <div className={cn('bg-amber-50 dark:bg-amber-900/10 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-900/30 shadow-sm', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-amber-900 dark:text-amber-500 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          Minhas Anotações
        </h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm font-medium text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 bg-amber-100/50 dark:bg-amber-900/30 px-3 py-1.5 rounded-lg transition-colors"
          >
            Editar
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escreva suas anotações clínicas aqui..."
            className="w-full min-h-[150px] p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-y outline-none transition-all"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setContent(note?.content || '');
                setIsEditing(false);
              }}
              className="px-4 py-2 text-sm font-medium text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm"
            >
              <Save className="w-4 h-4" />
              Salvar Anotação
            </button>
          </div>
        </div>
      ) : (
        <div className="prose prose-amber dark:prose-invert max-w-none">
          {content ? (
            <p className="text-amber-900 dark:text-amber-200 whitespace-pre-wrap leading-relaxed">{content}</p>
          ) : (
            <p className="text-amber-700/60 dark:text-amber-400/60 italic">Nenhuma anotação salva. Clique em editar para adicionar.</p>
          )}
          {note && (
            <p className="text-xs text-amber-600/60 dark:text-amber-500/60 mt-4 font-medium uppercase tracking-wider">
              Última atualização: {new Date(note.updatedAt).toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
