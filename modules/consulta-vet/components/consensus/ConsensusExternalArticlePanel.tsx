import React from 'react';
import { ExternalLink, Scale } from 'lucide-react';

interface ConsensusExternalArticlePanelProps {
  title: string;
  articleUrl: string | null;
  organization?: string | null;
}

export function ConsensusExternalArticlePanel({
  title,
  articleUrl,
  organization,
}: ConsensusExternalArticlePanelProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300">
            <Scale className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 className="font-semibold text-foreground">Documento original (fonte externa)</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Por <strong>direitos autorais</strong>, o Vetius não exibe nem hospeda o PDF integral de{' '}
              <span className="text-foreground">{title}</span>
              {organization ? (
                <>
                  {' '}
                  ({organization})
                </>
              ) : null}
              . Use o link abaixo para abrir o artigo ou diretriz na publicação oficial — costuma ser
              gratuito via DOI, repositório institucional ou portal da sociedade científica.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              O resumo, pontos-chave e aplicação prática nesta página foram elaborados editorialmente a
              partir da fonte, sem reprodução literal do texto protegido.
            </p>
          </div>
        </div>

        {articleUrl ? (
          <a
            href={articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Abrir artigo original
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : (
          <p className="text-sm text-muted-foreground">Link da publicação não disponível.</p>
        )}
      </div>
    </section>
  );
}
