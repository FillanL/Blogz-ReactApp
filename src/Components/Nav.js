import React from "react";
import '../App.css'


class Nav extends React.Component{
    render(){
        return(
            <ul className='no-dec'>
                <li>Logo</li>
                <li onClick={(e)=>this.props.handleUrl(e)}>home</li>
                <li onClick={(e)=>this.props.handleUrl(e)}>browse</li>
                <li onClick={(e)=>this.props.handleUrl(e)}>create</li>
                <li onClick={(e)=>this.props.handleUrl(e)}>saved</li>
                <li onClick={(e)=>this.props.handleUrl(e)}>Log In</li>
            </ul>
        )
    }
}
export default Nav