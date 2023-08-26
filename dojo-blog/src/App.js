import Navbar from './Navbar'
import Home from './Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Create from './Create'
import Edit from './Edit'
import BlogDetails from './BlogDetails'
import NotFound from './NotFound'

import { useState } from 'react'

function App() {
  const [currentBlog, setCurrentBlog] = useState({})

  const retrieveCurrentBlog = () => {
    return currentBlog
  }

  const storeCurrentBlog = (b) => {
    setCurrentBlog(b)
    console.log('App.storeCurrentBlog')
    console.log(b)
  }

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='content'>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/create'>
              <Create />
            </Route>
            <Route path='/edit'>
              <Edit retrieveCurrentBlog={retrieveCurrentBlog} />
            </Route>
            <Route path='/blogs/:id'>
              <BlogDetails storeCurrentBlog={storeCurrentBlog} />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
