import React from 'react'
import ArticleCard from '../Components/ArticleCard'
import '../App.css'


class BrowseArticles extends React.Component {
    render() {
        return (
            <div>
                <input onChange={(e) => this.props.onSearchChange(e)} type="search" value={this.props.searchVal} placeholder="Search Article...." />
                <button>GO</button>

                <div className="browseContain" style={{ color: "green" }}>
                    {this.props.articles.map(article =>
                        <ArticleCard key={article.id} article={article} />
                    )}
                </div>
            </div>
        )
    }
}

export default BrowseArticles