import React, { createContext, useState } from 'react'

export const CurrentBlogContext = createContext()

export const CurrentBlogProvider = ({ children }) => {
  const [currentBlog, setCurrentBlog] = useState({})
  return (
    <CurrentBlogContext.Provider value={{ currentBlog, setCurrentBlog }}>
      {children}
    </CurrentBlogContext.Provider>
  )
}
