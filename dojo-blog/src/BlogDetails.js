import { useHistory, useParams } from 'react-router-dom'
import useFetch from './useFetch'

const BlogDetails = (props) => {
  const { id } = useParams()

  const {
    data: blog,
    error,
    isPending,
  } = useFetch('http://localhost:8000/blogs/' + id)

  const history = useHistory()

  const handleDelete = () => {
    fetch('http://localhost:8000/blogs/' + blog.id, {
      method: 'DELETE',
    }).then(() => {
      history.push('/')
    })
  }

  const handleEdit = () => {
    props.storeCurrentBlog(blog)

    history.push('/edit')
  }

  return (
    <div className='blog-details'>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleDelete}>delete</button>
          <button onClick={handleEdit}>edit</button>
        </article>
      )}
    </div>
  )
}

export default BlogDetails
