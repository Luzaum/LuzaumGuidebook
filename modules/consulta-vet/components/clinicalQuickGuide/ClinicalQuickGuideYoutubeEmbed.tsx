import React from 'react';

interface ClinicalQuickGuideYoutubeEmbedProps {
  videoId: string;
  title: string;
}

/** iframe responsivo 16:9 — reproduz no próprio app */
export function ClinicalQuickGuideYoutubeEmbed({ videoId, title }: ClinicalQuickGuideYoutubeEmbedProps) {
  const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0`;

  return (
    <div className="overflow-hidden rounded-2xl border border-border/80 bg-black/40 shadow-lg ring-1 ring-white/5">
      <div className="relative aspect-video w-full">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}
