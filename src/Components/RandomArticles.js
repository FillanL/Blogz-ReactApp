import React from 'react'
import ArticleCard from '../Components/ArticleCard'


class RandomArticles extends React.Component {


    render() {
        // console.log("RA",this.props.articles)
        console.log("here", this.props.randomNum());
        return (
            <>
                <h2 style={{ marginLeft: "15px", color: "#011627" }}>Recommended Articles</h2>
                <div className="random-contain">
                    {this.props.randomNum().length > 2 ?
                        this.props.randomNum().map(article =>
                            <ArticleCard
                                addFave={this.props.addFave}
                                key={article.id}
                                article={article}
                            />
                        ) : null
                    }
                </div>
            </>
        )
    }
}
export default RandomArticles