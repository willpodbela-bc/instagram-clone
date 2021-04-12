import React from "react"
import css from "./App.module.css"
import Header from "./Header"
import Home from "./Home"
import Navbar from "./Navbar"
import Explore from "./Explore"
import NewPost from "./NewPost"
import Activity from "./Activity"
import Profile from "./Profile"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import StoreContextProvider from "../contexts/StoreContext"

function App(){
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <StoreContextProvider>
        <div className={css.container}>
          <Header />
          <main className={css.content}>
            <Switch>
              <Route path="/explore">
                <Explore />
              </Route>
              <Route path="/newpost">
                <NewPost />
              </Route>
              <Route path="/activity">
                <Activity />
              </Route>
              <Route path="/profile/:userId?">
                <Profile />
              </Route>
              <Route path="/:postId?">
                <Home />
              </Route>
            </Switch>
          </main>
          <Navbar />
        </div>
      </StoreContextProvider>
    </Router>
  )
}

export default App
