import React from 'react';

class NewPost extends React.Component {
    render() {
        const { onSubmitFormChange, postSubmitVal,postSubmit } = this.props
        return (
            <div>
                <form className="ui form" onSubmit={postSubmit}>
                    <label htmlFor="title">title</label><br></br>
                    <input
                        onChange={(e) => onSubmitFormChange(e)} type="text" name="title" value={postSubmitVal.title}
                    /><br></br>
                    <label htmlFor="keyword">keyword</label><br></br>
                    <input
                        onChange={(e) => onSubmitFormChange(e)} type="text" name="keyword" value={postSubmitVal.keyword}
                    /><br></br>
                    <label htmlFor="Category">Category
                    </label><br></br>
                    <input
                        onChange={(e) => onSubmitFormChange(e)} type="text" name="category" value={postSubmitVal.category}
                    /><br></br>
                    <label
                        htmlFor="Content">Content
                    </label><br></br>
                    <textarea
                        onChange={(e) => onSubmitFormChange(e)} name="content"
                        value={postSubmitVal.content}
                        style={{ fontSize: "1.25em", lineHeight: "1.2em" }} rows="10" cols="80" placeholder="Tell your story ..."
                    ></textarea>
                    <br></br>
                    <button className="ui button" >SUBMIT</button>

                </form>
            </div>
        )
    }
}
export default NewPost