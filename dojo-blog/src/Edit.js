import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from './useFetch'
import { useHistory } from 'react-router-dom'

const EditBlog = () => {
  const [body, setBody] = useState('')

  const history = useHistory()

  const { id } = useParams()

  const {
    data: blog,
    error,
    isPending,
  } = useFetch('http://localhost:8000/blogs/' + id)

  const handleOnChange = (e) => {
    setBody(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    blog.body = body
    console.log('handleSubmit, blog=' + blog)

    fetch('http://localhost:8000/blogs/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    }).then(() => {
      history.push('/')
    })
  }

  const isButtonDisabled = body.trim() === '' // Disable button if body is empty or only whitespace

  return (
    <div className='create'>
      <form onSubmit={handleSubmit}>
        <h2>{blog && blog.title}</h2>
        <label>Blog body:</label>
        <textarea
          rows={10}
          required
          defaultValue={blog && blog.body}
          onChange={handleOnChange}
        ></textarea>
        <label>Blog author:</label>
        <label>{blog && blog.author}</label>
        <button disabled={isButtonDisabled}>Save blog</button>
      </form>
    </div>
  )
}

export default EditBlog
