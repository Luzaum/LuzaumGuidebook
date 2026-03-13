import React, { useEffect, useState } from 'react';
import { Edit3, Save } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { useLocalNotes } from '../../hooks/useLocalNotes';
import { LocalNoteEntityType } from '../../types/notes';

interface NotesEditorProps {
  entityType: LocalNoteEntityType;
  entityId: string;
  className?: string;
}

const UI_TEXT = {
  title: 'Minhas anota\u00e7\u00f5es',
  edit: 'Editar',
  placeholder: 'Escreva suas anota\u00e7\u00f5es cl\u00ednicas aqui...',
  cancel: 'Cancelar',
  save: 'Salvar anota\u00e7\u00e3o',
  empty: 'Nenhuma anota\u00e7\u00e3o salva. Clique em editar para adicionar.',
  updatedAt: '\u00daltima atualiza\u00e7\u00e3o',
} as const;

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
    <div className={cn('rounded-2xl border border-amber-200/50 bg-amber-50 p-6 shadow-sm dark:border-amber-900/30 dark:bg-amber-900/10', className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-amber-900 dark:text-amber-500">
          <Edit3 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          {UI_TEXT.title}
        </h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-lg bg-amber-100/50 px-3 py-1.5 text-sm font-medium text-amber-700 transition-colors hover:text-amber-900 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:text-amber-300"
          >
            {UI_TEXT.edit}
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={UI_TEXT.placeholder}
            className="min-h-[150px] w-full resize-y rounded-xl border border-amber-200 bg-white p-4 text-slate-700 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-amber-400 dark:border-amber-800 dark:bg-slate-900 dark:text-slate-300"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setContent(note?.content || '');
                setIsEditing(false);
              }}
              className="rounded-lg px-4 py-2 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/50"
            >
              {UI_TEXT.cancel}
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-amber-700"
            >
              <Save className="h-4 w-4" />
              {UI_TEXT.save}
            </button>
          </div>
        </div>
      ) : (
        <div className="prose prose-amber max-w-none dark:prose-invert">
          {content ? (
            <p className="whitespace-pre-wrap leading-relaxed text-amber-900 dark:text-amber-200">{content}</p>
          ) : (
            <p className="italic text-amber-700/60 dark:text-amber-400/60">{UI_TEXT.empty}</p>
          )}
          {note && (
            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-amber-600/60 dark:text-amber-500/60">
              {UI_TEXT.updatedAt}: {new Date(note.updatedAt).toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
