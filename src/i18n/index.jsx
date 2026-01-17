import { createContext, useContext, useState, useEffect } from 'react'
import fr from './fr.json'
import en from './en.json'
import ar from './ar.json'

const translations = { fr, en, ar }

const I18nContext = createContext()

export function I18nProvider({ children }) {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('vega-lang') || 'fr'
    })

    useEffect(() => {
        localStorage.setItem('vega-lang', lang)
        document.documentElement.lang = lang
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    }, [lang])

    const t = (key) => {
        const keys = key.split('.')
        let value = translations[lang]
        for (const k of keys) {
            value = value?.[k]
        }
        return value || key
    }

    return (
        <I18nContext.Provider value={{ lang, setLang, t }}>
            {children}
        </I18nContext.Provider>
    )
}

export function useI18n() {
    const context = useContext(I18nContext)
    if (!context) {
        throw new Error('useI18n must be used within I18nProvider')
    }
    return context
}
