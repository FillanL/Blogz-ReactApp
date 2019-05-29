import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
// library.add(faStroopwafel);

import Nav from './Components/Nav'
import FeaturedArticle from './Containers/FeaturedArticles'
import BrowseArticles from './Containers/BrowseArticles'
import NewPost from './Containers/NewPost'
import LogIn from './Components/LogIn'
import Slider from './Components/Slider'



// number article to show per 
const NUMFEATURED = 4

class App extends React.Component {

  state = {
    currentUser: null,
    articles: [],
    featured: [],
    featuredStartIndex: 0,
    searchVal: "",
    postSubmitVal: {
      title: "",
      keyword: "",
      category: "",
      content: ""
    },
    signUpVal: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      userUrl: "",
      location: ""
    },
    signInVal: {
      username: "",
      password: ""
    }
  }



  // ---------Login/LogOut ----------------

  handleCurrentUser = (User) => {
    localStorage.setItem('token', User.id)

    this.setState({
      currentUser: User,
      signInVal: {
        username: "",
        password: ""
      }
    })
  }
  handleLogOut = () => {
    localStorage.removeItem('token')
    this.setState({
      currentUser: null
    })
  }

  // ---------article scroller----------------
  handleMoreBtnClick = () => {
    // to make code readable did not use !
    if (((this.state.featuredStartIndex + NUMFEATURED) >= (this.state.featured.length)) === false) {
      this.setState({
        featuredStartIndex: this.state.featuredStartIndex + NUMFEATURED
      })
    }
  }
  handleLessBtnClick = () => {
    if (this.state.featuredStartIndex !== 0) {
      this.setState({
        featuredStartIndex: this.state.featuredStartIndex - NUMFEATURED
      })
    }
  }
  // ------------Browse articles Filter search------
  handleSearchChange = (e) => {
    this.setState({
      searchVal: e.target.value
    })
  }
  // -------------User Sign IN Logics----------------
  handleSignInChange = (e) => {
    // e.preventDefault()
    this.setState({
      signInVal: {
        ...this.state.signInVal,
        [e.target.name]: e.target.value
      }
    })
  }
  handleLogInSubmit = (e) => {
    e.preventDefault()
    // console.log("here")

    fetch("http://localhost:3000/api/v1/auth", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }, body: JSON.stringify({
        "user": this.state.signInVal
      })
    }).then(r => r.json())
      .then(user => {
        // console.log(user.error)
        if (user.error === "user or password could not be found") {
          console.log("here")
        } else {
          // console.log("not there")
          this.handleCurrentUser(user)
          this.props.history.push("/")
        }
      })
  }

  // -------------User Sign UP Logics----------------
  handleSignUpChange = (e) => {
    this.setState({
      signUpVal: {
        ...this.state.signUpVal,
        [e.target.name]: e.target.value
      }
    })
  }

  signUpSubmit = (e) => {
    e.preventDefault()

    console.log('signuppp')
    fetch("http://localhost:3000/api/v1/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        "user": {
          first_name: this.state.signUpVal.firstName,
          last_name: this.state.signUpVal.lastName,
          password: this.state.signUpVal.password,
          img_url: this.state.signUpVal.userUrl,
          username: this.state.signUpVal.username,
          location: this.state.signUpVal.location
        }
      })
    })
  }
  // ---------------Post new Article-----------------
  postSubmit = (e) => {
    e.preventDefault()

    fetch("http://localhost:3000/api/v1/articles", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        article: this.state.postSubmitVal
      })
    })
      .then(this.setState({
        postSubmitVal: {
          title: "",
          keyword: "",
          category: "",
          content: ""
        }
      }))
  }
  handleSubmitFormChange = (e) => {
    // controll newPost Form values
    this.setState({
      postSubmitVal: {
        ...this.state.postSubmitVal,
        [e.target.name]: e.target.value
      }
    })
  }
  // ---------------after components mounted------------
  componentDidMount() {


    fetch("http://localhost:3000/api/v1/articles")
      .then(r => r.json())
      .then(articles => {
        const updatedfeatured = articles.filter(article =>
          article.featured === true
        )
        this.setState({
          articles: articles,
          filter: articles,
          featured: updatedfeatured
        })
      })

      const token = localStorage.getItem("token")
      if (token) {

      fetch("http://localhost:3000/api/v1/auth", {
        headers: {
          Authenticate: token
        }
      })
      .then(r => r.json())
      .then(user =>{
        if (!user.error){
          this.setState({
            currentUser: user
          })
        }
      })
    }

  }


  render() {
    const { featuredStartIndex, featured, articles, searchVal, postSubmitVal, signUpVal, signInVal } = this.state

    // functions ONLY
    const { signUpSubmit, handleLogInSubmit, handleCurrentUser, handleLogOut } = this

    const upDateFilter = articles.filter(article => article.title.toLowerCase().includes(this.state.searchVal.toLowerCase())
    )

    // console.log('handleCurrentUser', this.state.currentUser)

    return (
      <div>
        <Nav
          currentUser={this.state.currentUser}
          handleLogOut={handleLogOut}
        />
{/* <FontAwesomeIcon icon="fas fa-anchor" /> */}
        <Switch>
          <Route exact path="/" render={() =><>
            <Slider />
            <FeaturedArticle
              articles={featured.slice(featuredStartIndex, featuredStartIndex + NUMFEATURED)}
              onLessBtnClick={this.handleLessBtnClick}
              onMoreBtnClick={this.handleMoreBtnClick}
            />
            </>} />
          <Route path="/browse" render={() =>
            <BrowseArticles
              articles={upDateFilter}
              onSearchChange={this.handleSearchChange}
              searchVal={searchVal}
            />}
          />

          <Route path="/login" render={() =>
            <LogIn
              signUpVal={signUpVal}
              handleSignUpChange={this.handleSignUpChange}
              handleSignInChange={this.handleSignInChange}
              handleLogInSubmit={handleLogInSubmit}
              signUpSubmit={signUpSubmit}
              signInVal={signInVal}
              handleCurrentUser={handleCurrentUser}
            />}
          />
          <Route path="/create" render={() =>
            <NewPost
              postSubmit={this.postSubmit}
              onSubmitFormChange={this.handleSubmitFormChange}
              postSubmitVal={postSubmitVal}
            />}
          />
        </Switch>
        {/* <footer/> */}
      </div>
    )
  }
}

export default withRouter(App);
