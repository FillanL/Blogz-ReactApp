import React, { Component } from 'react'

class editPost extends Component {

    state = {
        editPost: {
            category: "",
            keyword:"",
            title:"",
            content: ""
        }
    }
    handleChange = (e) => {
        this.setState({
            editPost:{
                ...this.state.editPost,
               [e.target.name]: e.target.value
            }
        })
    }
    

    render() {

        console.log("heree",this.props);
        
        return (
            <div>
               
                <form className="ui form" >
                    <label htmlFor="title">title</label><br></br>

                    <input
                        onChange={(e) => this.handleChange(e)}
                        type="text" 
                        name="title" 
                        value={this.state.editPost.title}
                    /><br></br>

                    <label htmlFor="keyword">keyword</label><br></br>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        type="text"
                        name="keyword" 
                        value={this.state.editPost.keyword}
                    /><br></br>


                    <label htmlFor="Category">
                        Category
                    </label><br></br>
                    <input
                        onChange={(e) => this.handleChange(e)}
                         type="text" name="category" 
                         value={this.state.editPost.category}
                    /><br></br>

                    <label
                        htmlFor="Content">Content
                    </label><br></br>
                    <textarea
                        onChange={(e) => this.handleChange(e)} 
                        name="content"
                        value={this.state.editPost.content}
                        style={{ fontSize: "1.25em", lineHeight: "1.2em" }} rows="10" cols="80" placeholder="Tell your story ..."
                    ></textarea>
                    <br></br>
                    <button className="ui button" >SUBMIT</button>

                </form>
            </div>
        )
    }
}

export default editPost
