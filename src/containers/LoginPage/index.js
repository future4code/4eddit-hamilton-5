import React, { Component } from "react";
import { connect } from "react-redux";
import { push, replace } from "connected-react-router";
import { routes } from "../Router/index";
import { login } from "../../actions/users"
import styled from "styled-components";

const Form = styled.form``;

const loginForm = [
  {
    name: "email",
    type: "email",
    label: "Email ",
    title: "Digite um email válido",
  },
  {
    name: "password",
    type: "password",
    label: "Senha ",
  },
];

class LoginPage extends Component {
  state = {
    login: {},
  };

  componentDidMount () {
    const token = localStorage.getItem("token")
    if(token !== null) {
      this.props.goToPosts()
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      login: { ...this.state.login, [name]: value },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signin(this.state.login);
  };
  
  render() {
    return (
      <div>
        <Form onSubmit = {this.handleSubmit}>
          {loginForm.map((input) => {
            return (
              <div key={input.name}>
                <label htmlFor={input.name}>{input.label}</label>
                <input
                  required
                  name={input.name}
                  type={input.type}
                  title={input.title}
                  value={this.state.login[input.name] || ""}
                  onChange={this.handleInputChange}
                />
              </div>
            );
          })}
          <button type= "submit">Entrar</button>
        </Form>
        <button onClick={() => this.props.goToSignupScreen()}>Cadastrar</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  goToSignupScreen: () => dispatch(push(routes.signup)),
  signin: (body) => dispatch(login(body)), 
  goToPosts: () => dispatch(replace(routes.posts))
});

export default connect(null, mapDispatchToProps)(LoginPage);
