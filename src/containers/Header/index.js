import React from 'react'
import { push, replace } from "connected-react-router";
import { routes } from "../Router/index";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import styled from "styled-components"
import logo from "../../img/4eddit.png"

const HeaderBar = styled.header ` 
    background-color: #E78062;
    padding: 10px;
    display: flex;
    justify-content: space-between;
`
const Logo = styled.img ` 
    height: 60px;
    margin-left: 2%;
    cursor: pointer;
`

const ExitToAppIconStyled = styled(ExitToAppIcon)`
    height: 40px ;
    width: 40px;
    color: white;
    align-self: center;
    margin-right: 2%;
    cursor: pointer;
`


class Header extends React.Component {

    handleLogout = () => {
        localStorage.clear()
        this.props.goToLoginPage()
    }
    

    render () {
        const isLogged = localStorage.getItem("token") !== null
        return (
            <HeaderBar>
                <Logo onClick={this.props.goToPosts} src={logo}/>
                {isLogged && <ExitToAppIconStyled fontSize="large" onClick={this.handleLogout}/> }
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