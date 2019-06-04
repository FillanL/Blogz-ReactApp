import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTwitter } from '@fortawesome/free-solid-svg-icons';
// library.add(faStroopwafel);

import Nav from './Components/Nav'
import FeaturedArticle from './Containers/FeaturedArticles'
import BrowseArticles from './Containers/BrowseArticles'
import NewPost from './Containers/NewPost'
import LogIn from './Components/LogIn'
import Slider from './Components/Slider'
import ArticleShow from './Components/ArticleShow';
import RandomArticles from './Components/RandomArticles';
import Profile from './Components/Profile';




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
  // -======================================
  // random num in array
  randomNum = () => {
    let i = 0
    let uniqRandom = []
    let artCount = this.state.articles.length

    if (artCount > 8) {
      while (i < 8) {
        let jnum = Math.floor(Math.random() * artCount) + 1

        if (uniqRandom.includes(jnum) === false) {
          uniqRandom.push(jnum)
          i++
        }
      }
      return this.state.articles.filter(article => uniqRandom.includes(article.id))
      // return uniqRandom
    } else {
      return 0
    }
  }

  // ===================================

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
        article: {
          ...this.state.postSubmitVal,
          user_id: localStorage.getItem("token")
        }
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
  // ---------update and delete article------------------

  updateArticle = () => {
    console.log("update");

  }
  deleteArticle = () => {
    console.log("delete");

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
        .then(user => {
          if (!user.error) {
            this.setState({
              currentUser: user
            })
          }
        })

      fetch('http://localhost:3000/api/v1/users')
        .then(r => r.json())
        .then(users => {
          this.setState({
            users: users
          }, console.log("mouting", this.state.users))

        })

    }
  }


  render() {
    // States variables
    const { featuredStartIndex, featured, articles, searchVal, postSubmitVal, signUpVal, signInVal } = this.state

    // functions ONLY
    const { signUpSubmit, handleLogInSubmit, handleCurrentUser, handleLogOut, updateArticle, deleteArticle } = this

    const upDateFilter = articles.filter(article => article.title.toLowerCase().includes(this.state.searchVal.toLowerCase())
    )
    const token = localStorage.getItem("token")

    const current = () => {
      if (this.state.users) {
        return this.state.users.find(user => user.id === Number(token))
      }
    }

    const myArticles = () => {
      if (this.state.articles) {
        return this.state.articles.filter(article => article.user.id === Number(token))
      }
    }
    // console.log(token, current())
    console.log("my art", myArticles())



    return (
      <div>
        <Nav
          currentUser={this.state.currentUser}
          handleLogOut={handleLogOut}
        />
        {/* <FontAwesomeIcon icon={fasTwitter} /> */}
        <Switch>
          <Route exact path="/" render={() => <>
            <Slider />
            <FeaturedArticle
              articles={featured.slice(featuredStartIndex, featuredStartIndex + NUMFEATURED)}
              onLessBtnClick={this.handleLessBtnClick}
              onMoreBtnClick={this.handleMoreBtnClick}
            />
            <RandomArticles
              articles={this.state.randomArticles}
              randomNum={this.randomNum}
            />
          </>} />
          <Route path="/browse" render={() =>
            <BrowseArticles
            // here
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
          <Route path="/article" render={() =>
            <ArticleShow
            // article={this.state.articles.find(article=>  article === article)}
            />}
          />
          <Route path="/profile" render={() =>
            <Profile
            updateArticle={updateArticle}
            deleteArticle={deleteArticle}
              user={current}
              myArticles={myArticles}
            />
          }
          />
        </Switch>
        {/* <footer/> */}
      </div>
    )
  }
}

export default withRouter(App);
