import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom'

class ArticleCard extends React.Component {
    render() {
        const { id, title, content, keyword, category, user, article_url } = this.props.article

        return (
            <div className="ui raised padded segment" width={4} id={id} >
                {/* <div className="asd"> */}

                    <img src={article_url} alt="title" />
                    <h4>Title: {title}</h4>
                    <p>{category}</p>
                    <p>{content.substring(0, 90)} 
                    <Link to='/article'>show more
                    </Link>  
                    </p>
                    <p>key:{keyword}</p>
                    <p>by:{user.username}</p>
                    <button>add to Fav</button>
                {/* </div> */}

            </div>
        )
    }
}
export default ArticleCard