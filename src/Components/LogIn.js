import React from 'react'
import { withRouter } from 'react-router-dom'


class LogIn extends React.Component {

    render() {
        const { handleSignUpChange, handleSignInChange, signUpVal, signUpSubmit, signInVal, handleLogInSubmit } = this.props

        return (
            <div>

                <form className="ui large form" onSubmit={(e)=>handleLogInSubmit(e)}>
                    <label>Username</label>
                    <input
                        onChange={(e) => handleSignInChange(e)}
                        name="username"
                        type="text"
                        value={signInVal.username}
                    />

                    <label>Password</label>
                    <input
                        onChange={(e) => handleSignInChange(e)}
                        name="password"
                        type="password"
                        value={signInVal.password}
                    />
                    <button className="ui primary button">Log in</button>
                </form>

                <form className="ui large form" onSubmit={(e)=>signUpSubmit(e)}>
                    <label>First name</label>
                    <input
                        onChange={(e) => handleSignUpChange(e)} name="firstName" type="text"
                        value={signUpVal.firstName}
                    />
                    <label>Last name</label>
                    <input
                        onChange={(e) => handleSignUpChange(e)} name="lastName" type="text"
                        value={signUpVal.lastName}
                    />
                    <label>Location</label>
                    <input
                        onChange={(e) => handleSignUpChange(e)} name="location" type="text"
                        value={signUpVal.location}
                    />
                    <label>Username</label>
                    <input
                        onChange={(e) => handleSignUpChange(e)} name="username" type="text"
                        value={signUpVal.username}
                    />
                    <label>Password</label>
                    <input
                        onChange={(e) => handleSignUpChange(e)} name="password" type="password" value={signUpVal.password}
                    />
                    <label>Profile Picture</label>
                    <input
                        onChange={(e) => handleSignUpChange(e)} name="userUrl" type="text" value={signUpVal.userUrl}
                    />
                    <button className="ui primary button">Sign up</button>
                </form>
            </div>

        )
    }
}
export default withRouter(LogIn);