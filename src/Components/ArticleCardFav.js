import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom'

class ArticleCardFav extends React.Component {
    render() {
        const {id, category,article_url,title,content} = this.props.article
        
        return (
           
            <div
                className="card-setup"
                // className="ui raised padded segment" 
                id={id}
            >

                <p style={{ color: "darkgreen", frontStyle: " italic" }}>{category}</p>
                <img src={article_url} alt="title" />
                <h4>Title: {title}</h4>
                <p>{content.substring(0, 60)}...
                </p>
                <Link to='/article'> show more
                </Link>

            </div>
        )
    }
}
export default ArticleCardFav