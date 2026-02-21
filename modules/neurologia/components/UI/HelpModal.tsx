import React from 'react'
import { Modal } from './Modal'
import { Button } from './Button'
import type { HelpTopic } from '../../data/helpTopics'

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
  topic: HelpTopic | null
}

import { type RichContent } from '../../types/helpTopics'

function renderContent(content: string | RichContent[]) {
  if (typeof content === 'string') {
    return content
  }
  return (
    <div className="space-y-2">
      {content.map((block, i) => {
        const renderSpans = (spans: typeof block.content) =>
          spans.map((span, j) => {
            if (span.type === 'text') return <span key={j}>{span.value}</span>
            if (span.type === 'bold') return <strong key={j}>{span.value}</strong>
            if (span.type === 'underline') return <u key={j}>{span.value}</u>
            if (span.type === 'highlight') {
              let colorClass = 'text-yellow-300 bg-yellow-400/10'
              if (span.color === 'red') colorClass = 'text-red-300 bg-red-400/10'
              if (span.color === 'green') colorClass = 'text-green-300 bg-green-400/10'
              if (span.color === 'orange') colorClass = 'text-orange-300 bg-orange-400/10'
              if (span.color === 'blue') colorClass = 'text-blue-300 bg-blue-400/10'
              return (
                <mark key={j} className={`px-1 rounded ${colorClass} bg-transparent`}>
                  {span.value}
                </mark>
              )
            }
            return null
          })

        if (block.type === 'paragraph') {
          return <p key={i}>{renderSpans(block.content)}</p>
        }
        if (block.type === 'bullet') {
          return (
            <ul key={i} className="list-disc list-inside">
              <li>{renderSpans(block.content)}</li>
            </ul>
          )
        }
        return null
      })}
    </div>
  )
}

export function HelpModal({ isOpen, onClose, topic }: HelpModalProps) {
  if (!topic) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={topic.title} size="lg">
      <div className="space-y-6">
        {/* O que avalia */}
        <div>
          <h4 className="text-gold font-semibold mb-2 text-sm uppercase tracking-wide">
            O que avalia
          </h4>
          <div className="text-white/90 text-sm leading-relaxed">{renderContent(topic.whatItAssesses)}</div>
        </div>

        {/* Neuroanatomia/Neurofisiologia */}
        <div>
          <h4 className="text-gold font-semibold mb-2 text-sm uppercase tracking-wide">
            Neuroanatomia/Neurofisiologia
          </h4>
          <div className="text-white/90 text-sm leading-relaxed">{renderContent(topic.neuroanatomy)}</div>
        </div>

        {/* Como executar */}
        <div>
          <h4 className="text-gold font-semibold mb-2 text-sm uppercase tracking-wide">
            Como executar
          </h4>
          <div className="text-white/90 text-sm leading-relaxed">{renderContent(topic.howToPerform)}</div>
        </div>

        {/* Interpretação */}
        <div>
          <h4 className="text-gold font-semibold mb-2 text-sm uppercase tracking-wide">
            Interpretação
          </h4>
          <div className="text-white/90 text-sm leading-relaxed">{renderContent(topic.interpretation)}</div>
        </div>

        {/* Armadilhas */}
        <div>
          <h4 className="text-gold font-semibold mb-2 text-sm uppercase tracking-wide">
            Armadilhas comuns / Como repetir
          </h4>
          <div className="text-white/90 text-sm leading-relaxed">{renderContent(topic.pitfalls)}</div>
        </div>

        {/* Slot de imagem (futuro) */}
        {topic.imageSlot?.enabled && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-xs text-white/60 italic">{topic.imageSlot.caption}</p>
            <div className="mt-2 h-32 bg-white/5 rounded flex items-center justify-center">
              <span className="text-xs text-white/40">Imagem do teste (em desenvolvimento)</span>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-white/10">
          <Button variant="primary" onClick={onClose}>
            Entendi
          </Button>
        </div>
      </div>
    </Modal>
  )
}
