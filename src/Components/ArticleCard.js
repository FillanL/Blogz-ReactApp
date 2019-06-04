import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom'

class ArticleCard extends React.Component {
    render() {
        const { id, title, content, category, user, article_url } = this.props.article

        return (
            <div 
            className="card-setup"
            // className="ui raised padded segment" 
            id={id} 
            >

                <p style={{color: "darkgreen", frontStyle:" italic"}}>{category}</p>
                <img src={article_url} alt="title" />
                <h4>Title: {title}</h4>
                <p>{content.substring(0, 60)}
                    <Link to='/article'> show more
                    </Link>
                </p>
                {/* <p>key:{keyword}</p> */}
                <p>Author: {user.username}</p>
                {
                    user.id === Number(localStorage.getItem("token")) ?
                        <>
                            <button onClick={()=>this.props.updateArticle()} className="ui primary button">Update</button>
                            <button 
                            onClick={()=>this.props.deleteArticle()}
                            className="ui red button">Delete</button>
                        </>

                        :
                        <button className="ui button">favorite</button>
                }


            </div>
        )
    }
}
export default ArticleCard