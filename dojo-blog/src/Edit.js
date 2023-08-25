import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const EditBlog = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  //const id = searchParams.get('id')
  const title = searchParams.get('title')
  const body = searchParams.get('body')
  const author = searchParams.get('author')

  const { id } = useParams()

  console.log('EditBlog - title' + title)
  console.log(
    `EditBlog - /edit/${id}/title/${title}/body/${body}/author/${author}`
  )

  const blog = {
    title: title,
    body: body,
    author: author,
    id: id,
  }

  const [blogText, setBlogText] = useState(body)

  const history = useHistory()

  const handleOnChange = (e) => {
    setBlogText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    blog.body = blogText
    console.log('handleSubmit, blog=' + blogText)

    fetch('http://localhost:8000/blogs/' + id, {
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

export default EditBlog
