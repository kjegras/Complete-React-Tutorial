import { CurrentBlogContext } from '../context/CurrentBlogContext'
import { useContext } from 'react'

export const useCurrentBlogContext = () => {
  const context = useContext(CurrentBlogContext)

  if (!context) {
    throw Error(
      'useCurrentBlogContext must be used inside an CurrentBlogContext.Provider'
    )
  }

  return context
}
