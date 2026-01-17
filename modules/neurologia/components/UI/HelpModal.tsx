import React from 'react'
import { Modal } from './Modal'
import { Button } from './Button'
import type { HelpTopic } from '../../data/helpTopics'

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
  topic: HelpTopic | null
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
          <p className="text-white/90 text-sm leading-relaxed">{topic.whatItAssesses}</p>
        </div>

        {/* Neuroanatomia/Neurofisiologia */}
        <div>
          <h4 className="text-gold font-semibold mb-2 text-sm uppercase tracking-wide">
            Neuroanatomia/Neurofisiologia
          </h4>
          <p className="text-white/90 text-sm leading-relaxed">{topic.neuroanatomy}</p>
        </div>

        {/* Como executar */}
        <div>
          <h4 className="text-gold font-semibold mb-2 text-sm uppercase tracking-wide">
            Como executar
          </h4>
          <p className="text-white/90 text-sm leading-relaxed">{topic.howToPerform}</p>
        </div>

        {/* Interpretação */}
        <div>
          <h4 className="text-gold font-semibold mb-2 text-sm uppercase tracking-wide">
            Interpretação
          </h4>
          <p className="text-white/90 text-sm leading-relaxed">{topic.interpretation}</p>
        </div>

        {/* Armadilhas */}
        <div>
          <h4 className="text-gold font-semibold mb-2 text-sm uppercase tracking-wide">
            Armadilhas comuns / Como repetir
          </h4>
          <p className="text-white/90 text-sm leading-relaxed">{topic.pitfalls}</p>
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
