import React from 'react'

import en_US from '@/locales/en-US'
import zh_CN from '@/locales/zh-CN'

export type LangType = 'zh-CN' | 'en-US'

type SupportType = { [key in LangType]: { name: string } }

const languageContext = React.createContext<{
  lang: LangType
  supportLang: SupportType
  messages: any
  message: any
  toogleLang(lang: LangType): void
  getMessage(id: string, message: any, params: any, defaultMessage: any): React.ReactNode
  t(id: string, params?: any, defaultMessage?: any): React.ReactNode
}>({} as any)

const LanguageProvider: React.FunctionComponent<{ defaultLang?: LangType }> = ({
  children,
  defaultLang = 'zh-CN'
}) => {
  const [lang, setLang] = React.useState<LangType>(defaultLang)
  const supportLang: SupportType = {
    'zh-CN': {
      name: '中文'
    },
    'en-US': {
      name: 'English'
    }
  }
  const messages: any = {
    'zh-CN': zh_CN,
    'en-US': en_US
  }

  const message: any = React.useMemo(() => {
    return messages[lang]
  }, [messages, lang])

  const toogleLang = (lang: LangType) => {
    if (Object.keys(supportLang).indexOf(lang) > -1) {
      setLang(lang)
    }
  }

  const getMessage = (
    id: string,
    message: any,
    params?: any,
    defaultMessage?: any
  ): React.ReactNode => {
    let text: any = message[id]
    if (text) {
      return text
    }

    id.split('.').forEach((key) => {
      text = text ? text[key] : message[key]
    })
    if (!text) {
      text = defaultMessage || id
    }

    // 判断是否包含{.}
    if (!/{[^}]+}/g.test(text)) {
      return text
    }

    // 使用传入的参数[params]替换{.}
    const strs = text.split(/{[^}]+}/g)
    const keys = text.match(/{[^}]+}/g)
    const returns: React.ReactNode[] = []
    let i = 0
    strs.forEach((str: string, index: number) => {
      if (str !== '') {
        returns.push(str)
      }

      if (index === strs.length - 1) {
        return
      }
      const key = keys[i++].replace(/{|}/g, '')

      const element = params[key]
      // 是react元素和字符串的时候才会处理
      if (React.isValidElement(element)) {
        returns.push(
          React.cloneElement(element, {
            key: index
          })
        )
      } else if (['string', 'number', 'boolean'].indexOf(typeof element) > -1) {
        returns.push(String(element))
      } else {
        returns.push('')
      }
    })
    return returns
  }

  const t = (id: string, params?: any, defaultMessage?: any) => {
    return getMessage(id, message, params, defaultMessage)
  }

  return (
    <languageContext.Provider
      value={{ lang, supportLang, messages, message, toogleLang, getMessage, t }}>
      {children}
    </languageContext.Provider>
  )
}

const useLanguage = () => {
  const context = React.useContext(languageContext)

  return context
}

export { LanguageProvider, useLanguage }
