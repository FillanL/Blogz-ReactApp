import React from 'react'
import ArticleCard from '../Components/ArticleCard'


class Profile extends React.Component {
    state = {
        user: null
    }

    userInfo = () => {
        const token = localStorage.getItem("token")

        if (token) {
            fetch('http://localhost:3000/api/v1/users')
                .then(r => r.json())
                .then(users => {
                    const current = users.find(user => user.id === token)

                    console.log(token, current)

                    this.setState({
                        user: current,
                        token: token
                    }, console.log(this.state.user))

                })

        }
    }

    render() {
        // console.log('user', this.state.user)
        // console.log('toekn', this.props.user())

        if (this.props.user()) {

            return (
                <>
                    <div>
                        <button className="ui button green">Edit Profile</button>

                        <button className="ui button red">Delete Profile</button>

                    </div>
                    <img src={this.props.user().img_url} alt={this.props.user().username} />

                    <div> name: {this.props.user().username}</div>
                    <div>location: {this.props.user().location}</div>
                    <div>num of artiles: {this.props.myArticles().length} </div>

                    <div className="profile-grid">

                        {this.props.myArticles().map(article => 
                        <ArticleCard 
                         updateArticle={this.props.updateArticle}
                          deleteArticle={this.props.deleteArticle}
                           key={article.id} 
                           article={article} 
                           />)
                        }
                    </div>

                </>

            )
        } else {
            return (<div>helllo</div>)
        }

    }
}
export default Profile