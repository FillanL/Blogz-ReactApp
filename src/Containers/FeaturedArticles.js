import React from 'react'
import ArticleCard from '../Components/ArticleCard'

class FeaturedArticle extends React.Component{
    render(){
        return(
            <div>
                <h2>featured Articles</h2>
                {this.props.articles.map(article =>
                    <ArticleCard key={article.id} article={article}/>
                )}
                
            </div>
        )
    }

}
export default FeaturedArticle