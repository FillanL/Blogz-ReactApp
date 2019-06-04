import React from 'react'
import ArticleCard from '../Components/ArticleCard'
import '../App.css'

class FeaturedArticle extends React.Component {
    render() {
        // console.log(this.props);

        return (
            <div className="feat-padding">
                <h2>Featured Articles</h2>
                <div className=" fluid article-carousel-container">
                    <button onClick={() => this.props.onLessBtnClick()}> Less </button>
                    <div className="featuredContain" id="feat-art">

                        {this.props.articles.map(article =>

                            <ArticleCard key={article.id} article={article} />
                        )}
                    </div>
                    <button onClick={() => { this.props.onMoreBtnClick() }}>more</button>
                </div>
            </div>
        )
    }

}
export default FeaturedArticle