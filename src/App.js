import React from 'react'
import Login from './components/login-page/login-page'
import Personal from './components/personal-info-page/personlize-comp'
import Recommendation from './components/recommendation-page/recommand-comp'
import { BrowserRouter,Route, Redirect } from 'react-router-dom'
 
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
        { isAuth() ? <Personal/> : <Redirect to="/"/> }
      </Route>
      <Route path="/recommendations">
        { isAuth() ? <Recommendation/> : <Redirect to="/"/> }
      </Route>
    </BrowserRouter>
  )
}
export default App