import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import '../App.css'


class Nav extends React.Component {

    render() {
        const { handleLogOut } = this.props

        return (
            <ul className='no-dec'>
                <li>Logo</li>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/browse'>Browse</Link></li>
                {
                    this.props.currentUser ?
                        <Fragment>
                            <li><Link to='/create'>Create</Link></li>
                            <Link to='/favorites'>
                            
                            <li>favorites</li>
                            </Link>
                            <li><Link to="/profile">Profile</Link></li>
                            <li onClick={() => handleLogOut()}>
                                <Link to='/'> Log out</Link>
                            </li>
                        </Fragment>
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