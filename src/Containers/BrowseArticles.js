import React, { Fragment } from 'react'
import ArticleCard from '../Components/ArticleCard'
import '../App.css'


class BrowseArticles extends React.Component {
    render() {
        return (
            <Fragment>
                <div className="search-contain">

                    <input
                        className=" browse-search" 
                        onChange={(e) => this.props.onSearchChange(e)} 
                        type="search" value={this.props.searchVal} 
                        placeholder="Search Article...."
                    />
                    {/* <button className="ui button">GO</button> */}
                </div>

                <div className="container-padding ">

                    <div className="browseContain" style={{ color: "green" }}>
                        {this.props.articles.map(article =>
                            <ArticleCard addFave={this.props.addFave} key={article.id} article={article} />
                        )}
                    </div>
                </div>

            </Fragment>
        )
    }
}

export default BrowseArticles