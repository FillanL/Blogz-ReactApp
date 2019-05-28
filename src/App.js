import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Nav from './Components/Nav'
import FeaturedArticle from './Containers/FeaturedArticles'
import BrowseArticles from './Containers/BrowseArticles'
import NewPost from './Containers/NewPost'
import LogIn from './Components/LogIn'


// number article to show per 
const NUMFEATURED = 4

class App extends React.Component {

  state = {
    // Page: "home",
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
  handleUrl = (e) => {
    this.setState({
      Page: e.target.textContent
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
    console.log()

    this.setState({
      signInVal: {
        ...this.state.signInVal,
        [e.target.name]: e.target.value
      }
    })

  }

  // -------------User Sign UP Logics----------------
  handleSignUpChange = (e) => {
    // console.log(e.target.value)
    this.setState({
      signUpVal: {
        ...this.state.signUpVal,
        [e.target.name]: e.target.value
      }
    })
  }

  signUpSubmit = (e) => {
    e.preventDefault()
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

    fetch("http://localhost:3000/api/v1/articles",
      {
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
        Page: "browse",
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
  }
  render() {
    const { featuredStartIndex, featured, articles, searchVal, postSubmitVal, signUpVal, signInVal } = this.state

    // functions ONLY
    const { signUpSubmit } = this

    const upDateFilter = articles.filter(article => article.title.toLowerCase().includes(this.state.searchVal.toLowerCase())
    )

    console.log('signUpVal', signInVal)

    return (
      <div>
        <Nav
          handleUrl={this.handleUrl}
        />
        {this.state.Page === "home" ?
          <FeaturedArticle
            articles={featured.slice(featuredStartIndex, featuredStartIndex + NUMFEATURED)}
            onLessBtnClick={this.handleLessBtnClick}
            onMoreBtnClick={this.handleMoreBtnClick}
          /> :
          this.state.Page === "browse" ?
            <BrowseArticles
              articles={upDateFilter}
              onSearchChange={this.handleSearchChange}
              searchVal={searchVal}
            /> :
            this.state.Page === "create" ?
              <NewPost
                postSubmit={this.postSubmit}
                onSubmitFormChange={this.handleSubmitFormChange}
                postSubmitVal={postSubmitVal}
              />
              : this.state.Page === "Log In" ?
                <LogIn
                  signUpVal={signUpVal}
                  handleSignUpChange={this.handleSignUpChange}
                  handleSignInChange={this.handleSignInChange}
                  signUpSubmit={signUpSubmit}
                  signInVal={signInVal}
                />
                : null

        }
        {/* <Switch>
          <Route exact path="/" Component={FeaturedArticle} />
          <Route path="/browse" Component={BrowseArticles} />
          <Route path="/login" Component={LogIn} />
        </Switch> */}

        {/* <footer/> */}
      </div>
    )
  }
}

export default App;
