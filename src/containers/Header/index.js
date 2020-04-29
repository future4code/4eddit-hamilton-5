import React from 'react'
import { push } from "connected-react-router";
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
    render () {
        return (
            <HeaderBar>
                <Logo onClick={this.props.goToPosts} src={logo}/>
            </HeaderBar>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
      goToPosts: () => dispatch(push(routes.posts))
    };
  }
  
  export default connect(
    null,
    mapDispatchToProps
  )(Header);