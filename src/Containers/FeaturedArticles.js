import React from 'react'
import ArticleCard from '../Components/ArticleCard'

class FeaturedArticle extends React.Component{
    render(){
        console.log(this.props);
        
        return(
            <div>
                <h2>featured Articles</h2>
                <button onClick={()=>this.props.onLessBtnClick()}> Less </button>            

                {this.props.articles.map(article =>
                    
                    <ArticleCard key={article.id} article={article}/>
                )}
                <button onClick={()=>{this.props.onMoreBtnClick()}}>more</button>            
            </div>
        )
    }

}
export default FeaturedArticle