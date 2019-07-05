import React, { Component } from 'react'
import '../App.css';
import ArticleCardFav from '../Components/ArticleCardFav'

class favorites extends Component {
    render() {
        console.log(this.props);
        
        return (
            <div className="fav-grid">
                
                {this.props.user() ?
                this.props.user().saved_articles.map(article => 
                <ArticleCardFav 
                    key={article.article.id} 
                    article={article.article} 
                    />)
                : <p>loading...</p>
            }
            </div>
        )
    }
}

export default favorites
