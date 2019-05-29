import React from 'react';
import '../App.css';
// import css 

class ArticleCard extends React.Component {
    render() {
        const { id, title, content, keyword, category, user, article_url } = this.props.article

        return (
            <div className="ui card" id={id} >
                <img src={article_url} alt="title" />
                <h4>Title: {title}</h4>
                <p>{category}</p>
                <p>{content.substring(0, 90)} <a href="a">show more</a>  </p>
                <p>key:{keyword}</p>
                <p>by:{user.username}</p>
                <button>add to Fav</button>

            </div>
        )
    }
}
export default ArticleCard