import { useState, useEffect } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)

  console.log('useFetch: starting, url is' + url)

  useEffect(() => {
    const abortCont = new AbortController()

    setTimeout(() => {
      console.log('useFetch: before fetch()')
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            // error coming back from server
            throw Error('could not fetch the data for that resource')
          }
          return res.json()
        })
        .then((data) => {
          console.log('useFetch: We have data')
          setIsPending(false)
          setData(data)
          setError(null)
        })
        .catch((err) => {
          console.log('useFetch: We have error')
          if (err.name === 'AbortError') {
            console.log('fetch aborted')
          } else {
            // auto catches network / connection error
            setIsPending(false)
            setError(err.message)
          }
        })
    }, 1000)

    // abort the fetch
    return () => {
      console.log('useFetch: aborting')
      abortCont.abort()
    }
  }, [url])

  return { data, isPending, error }
}

export default useFetch
