import React from 'react';

import Nav from './Components/Nav'
import FeaturedArticle from './Containers/FeaturedArticles'
import BrowseArticles from './Containers/BrowseArticles'

class App extends React.Component {
  state={
    articles:[]
  }


  componentDidMount(){
    fetch("http://localhost:3000/api/v1/articles")
    .then(r => r.json())
    .then(articles=> {
      this.setState({
        articles:articles
      })
    })
  }
  render(){

    console.log(this.state.articles)
   return (
     <div>
       <Nav />
       <BrowseArticles />
       <FeaturedArticle articles={this.state.articles}/>
       {/* <footer/> */}
     </div>
   )
 }
}

export default App;
