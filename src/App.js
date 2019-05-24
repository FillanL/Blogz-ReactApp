import React from 'react';

import Nav from './Components/Nav'
import FeaturedArticle from './Containers/FeaturedArticles'
import BrowseArticles from './Containers/BrowseArticles'

const NUMFEATURED = 4
class App extends React.Component {
  state = {
    articles: [],
    featured: [],
    featuredStartIndex: 0
  }
  handleMoreBtnClick = () => {
    this.setState({
      featuredStartIndex: this.state.featuredStartIndex + NUMFEATURED
    })
    // console.log("here lciked");
    
    // this.setState(
    //   prevState=>{
    //   featuredStartIndex: prevState + NUMFEATURED
    // })
  }
  handleLessBtnClick = () => {
    // console.log("here lciked");
    if (this.state.featuredStartIndex !== 0) {
      this.setState({
        featuredStartIndex: this.state.featuredStartIndex - NUMFEATURED
      })
    }
  }


  componentDidMount() {
    fetch("http://localhost:3000/api/v1/articles")
      .then(r => r.json())
      .then(articles => {
        const updatedfeatured = articles.filter(article =>
          article.featured === "t"
        )

        this.setState({
          articles: articles,
          featured: updatedfeatured
        })

      })
  }
  render() {

    console.log("feat", this.state.featured)
    console.log("all", this.state.articles);

    return (
      <div>
        <Nav />
        <FeaturedArticle
          articles={this.state.featured.slice(this.state.featuredStartIndex, this.state.featuredStartIndex + NUMFEATURED)}
          onLessBtnClick={this.handleLessBtnClick}
          onMoreBtnClick={this.handleMoreBtnClick}

        />
        <BrowseArticles
          articles={this.state.articles}
        />
        {/* <footer/> */}
      </div>
    )
  }
}

export default App;
