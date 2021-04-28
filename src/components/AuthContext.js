import React from "react"

const AuthContext = React.createContext()



class AuthProvider extends React.Component {
    state = {
        user: {
            name: "Matt"
        }
    }
    render() {
        return (
            <div>
                <AuthContext.Provider
                value={{user: this.state.user}}
                >
                    {this.props.children}
                </AuthContext.Provider>
            </div>
        );
    }
}

const AuthConsumer = AuthContext.Consumer

export default {AuthProvider, AuthConsumer};