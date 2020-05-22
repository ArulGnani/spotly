import React, { useState, useEffect } from 'react'
import Login from './components/login-page/login-page'
import Personal from './components/personal-info-page/personlize-comp'
import Recommendation from './components/recommendation-page/recommand-comp'
import _404 from './not-authendicated'
import { BrowserRouter,Route } from 'react-router-dom'
 
const App = () => {
  const [isAuth,setAuth] = useState(false)

  useEffect(() => {
    let accessToken = sessionStorage.hasOwnProperty("access-token")
    if (accessToken) setAuth(true)
  },[])

  return (
    <BrowserRouter>
      <Route exact path="/">
        <Login/>
      </Route>  
      <Route path="/personal">
        { isAuth ? <Personal/> : <_404/> }
      </Route>
      <Route path="/recommendations">
        { isAuth ? <Recommendation/> : <_404/> }
      </Route>
    </BrowserRouter>
  )
}
export default App