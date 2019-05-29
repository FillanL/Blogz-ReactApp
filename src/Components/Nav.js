import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import '../App.css'


class Nav extends React.Component {

    render() {
        const {handleLogOut} =this.props

        return (
            <ul className='no-dec'>
                <li>Logo</li>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/browse'>Browse</Link></li>
                <li><Link to='/create'>Create</Link></li>
                <li>saved</li>
                {
                    this.props.currentUser ?
                        (<li onClick={()=>handleLogOut()}>
                            <Link exact to='/'>
                            Log out
                            </Link>
                            </li>)
                        :
                        <Fragment>
                            <li><Link to='/login'>Log in</Link></li>
                            <li><Link to='/Signup'>Sign Up</Link></li>
                        </Fragment>
                }
            </ul>
        )
    }
}
export default Nav