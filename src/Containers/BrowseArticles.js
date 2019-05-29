import React, { Fragment } from 'react'
import ArticleCard from '../Components/ArticleCard'
import '../App.css'


class BrowseArticles extends React.Component {
    render() {
        return (
            <Fragment>
                <input className="ui big input focus" onChange={(e) => this.props.onSearchChange(e)} type="search" value={this.props.searchVal} placeholder="Search Article...." />
                
                <button className="ui button">GO</button>
                <div className="ui four column grid">

                    {/* <h2>BrowseArticles</h2> */}

                    <div className="browseContain" style={{ color: "green" }}>
                        {this.props.articles.map(article =>
                            <ArticleCard key={article.id} article={article} />
                        )}
                    </div>
                </div>

            </Fragment>
        )
    }
}

export default BrowseArticles