import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Navbar from './components/Navbar'
import Travel from './components/Travel'
import Boxing from './components/Boxing'
import Work from './components/Work'
import WorkInProgress from './components/WorkInProgress'
import './App.scss'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/donate">
            <WorkInProgress />
          </Route>
          <Route path="/travel">
            <Travel />
          </Route>
          <Route path="/work">
            <Work />
          </Route>
          <Route path="/">
            <Travel />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
