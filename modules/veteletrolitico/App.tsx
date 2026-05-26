import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hub } from './pages/Hub'
import { Identification } from './pages/Identification'
import { Configuration } from './pages/Configuration'
import { Result } from './pages/Result'
import { Library } from './pages/Library'

export default function VeteletroliticoPage() {
    const [currentScreen, setCurrentScreen] = useState('hub')

    const renderScreen = () => {
        switch (currentScreen) {
            case 'hub':
                return <Hub onNavigate={setCurrentScreen} />
            case 'identification':
                return <Identification onNavigate={setCurrentScreen} />
            case 'configuration':
                return <Configuration onNavigate={setCurrentScreen} />
            case 'result':
                return <Result onNavigate={setCurrentScreen} />
            case 'library':
                return <Library onNavigate={setCurrentScreen} />
            default:
                return <Hub onNavigate={setCurrentScreen} />
        }
    }

    return (
        <div className="w-full min-h-[100dvh] overflow-x-hidden bg-vet-bg-light dark:bg-vet-bg-dark">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentScreen}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="w-full"
                >
                    {renderScreen()}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
