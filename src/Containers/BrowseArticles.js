import React from 'react'
import ArticleCard from '../Components/ArticleCard'


class BrowseArticles extends React.Component{
    render(){
        return(
            <div>
                <input type="search" placeholder="Search Article...." />
                <button>GO</button>

                <div style={{color: "green"}}>
                {this.props.articles.map(article => 
                    <ArticleCard key={article.id} article={article}/>
                )}
                </div>
            </div>
        )
    }
}

export default BrowseArticles