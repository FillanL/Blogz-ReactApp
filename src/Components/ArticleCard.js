import React from "react";
// import css 

class ArticleCard extends React.Component{
    render(){
        const {id, title, content, keyword, category}=this.props.article
        return(
           <div id={id}>
               <img src="#" alt=""/>
               <h2>Title: {title}</h2>
               <p>{content}</p>
               <p>{category}</p>
               <p>key:{keyword}</p>
           </div>
        )
    }
}
export default ArticleCard