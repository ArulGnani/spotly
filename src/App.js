import React from 'react'
import Login from './components/login-page/login-page'
import Personal from './components/personal-info-page/personlize-comp'
import Recommendation from './components/recommendation-page/recommand-comp'
import _404 from './not-authendicated'
import { BrowserRouter,Route } from 'react-router-dom'
 
const App = () => {
  const isAuth = () => {
    let accessToken = sessionStorage.getItem("access-token")
    if (accessToken) return true
    else return false
  }

  return (
    <BrowserRouter>
      <Route exact path="/">
        <Login/>
      </Route>  
      <Route path="/personal">
        { isAuth() ? <Personal/> : <_404/> }
      </Route>
      <Route path="/recommendations">
        { isAuth() ? <Recommendation/> : <_404/> }
      </Route>
    </BrowserRouter>
  )
}
export default App