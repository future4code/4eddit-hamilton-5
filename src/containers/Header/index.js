import React from 'react'
import { push, replace } from "connected-react-router";
import { routes } from "../Router/index";
import { connect } from "react-redux";
import styled from "styled-components"
import logo from "../../img/4eddit.png"

const HeaderBar = styled.header ` 
    background-color: #E78062;
    padding: 15px 0;
`
const Logo = styled.img ` 
    height: 80px;
    margin-left: 2%;
    cursor: pointer;
`

class Header extends React.Component {

    handleLogout = () => {
        localStorage.clear()
        this.props.goToLoginPage()
        window.location.reload(); 
    }
    

    render () {
        const isLogged = localStorage.getItem("token") !== null
        return (
            <HeaderBar>
                <Logo onClick={this.props.goToPosts} src={logo}/>
                {isLogged && <button onClick={this.handleLogout}>Logout</button>}
            </HeaderBar>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
      goToPosts: () => dispatch(push(routes.posts)),
      goToLoginPage: () => dispatch(replace(routes.login))
    };
  }
  
  export default connect(
    null,
    mapDispatchToProps
  )(Header);