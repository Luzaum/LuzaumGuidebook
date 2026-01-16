import React from 'react'
import { Modal } from './Modal'
import { Button } from './Button'
import { HelpTopic } from '../../lib/help/helpTopicsComplete'

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
        <p className="text-gold/80 text-sm uppercase tracking-wider">
          {topic.section.replace('_', ' ')}
        </p>

        <div className="space-y-4 text-white/90">
          <p>{topic.content}</p>

          {topic.clinicalTip && (
            <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
              <h4 className="text-gold font-medium mb-2">Dica Clínica</h4>
              <p>{topic.clinicalTip}</p>
            </div>
          )}

          {topic.additionalInfo && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">
                Informações Adicionais
              </h4>
              <p>{topic.additionalInfo}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="primary" onClick={onClose}>
            Entendi
          </Button>
        </div>
      </div>
    </Modal>
  )
}
