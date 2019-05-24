import React from "react";

class ArticleCard extends React.Component{
    render(){
        const {id, title, content}=this.props.article
        return(
           <div id={id}>
               <img src="#" alt=""/>
               <h2>Title: {title}</h2>
               <p> brieff summarry or 30 chars wrapped</p>
               <p>{content}</p>
               <p></p>
           </div>
        )
    }
}
export default ArticleCard