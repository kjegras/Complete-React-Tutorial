import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useCurrentBlogContext } from './hooks/useCurrentBlogContext'

const Edit = () => {
  const { currentBlog } = useCurrentBlogContext()
  console.log('currentBlog: ', currentBlog)

  const blog = { ...currentBlog }

  const [blogText, setBlogText] = useState(blog.body)

  const history = useHistory()

  const handleOnChange = (e) => {
    setBlogText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    blog.body = blogText
    console.log('handleSubmit, blog=' + blogText)

    fetch('http://localhost:8000/blogs/' + blog.id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    }).then(() => {
      history.push('/')
    })
  }

  const isButtonDisabled = blogText.trim() === ''

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

export default Edit
