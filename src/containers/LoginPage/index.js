import React, { Component } from "react";
import { connect } from "react-redux";
import { push, replace } from "connected-react-router";
import { routes } from "../Router/index";
import { login } from "../../actions/users";
import Header from "../Header";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MainWrapper, LoginWrapper, ButtonStyled, ErrorMessage } from "./style";

const loginForm = [
  {
    name: "email",
    type: "email",
    label: "Email ",
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

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      this.props.goToPosts();
    }
  }

  handleInputLogin = (e) => {
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
      <>
        <Header />
        <MainWrapper>
          <LoginWrapper onSubmit={this.handleSubmit}>
            {loginForm.map((input) => {
              return (
                <div key={input.name}>
                  <TextField
                    label={input.label}
                    required
                    name={input.name}
                    type={input.type}                    
                    value={this.state.login[input.name] || ""}
                    onChange={this.handleInputLogin}
                  />
                </div>
              );
            })}
            {this.props.loginError && <ErrorMessage error={this.props.loginError}>Dados incorretos</ErrorMessage>}
            
            <Button color="secondary" variant="contained" type="submit">
              Entrar
            </Button>
            <p>OU</p>
            <ButtonStyled
              color="primary"
              variant="contained"
              onClick={() => this.props.goToSignupScreen()}
            >
              Cadastrar
            </ButtonStyled>
          </LoginWrapper>
        </MainWrapper>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loginError: state.posts.loginError
})

const mapDispatchToProps = (dispatch) => ({
  goToSignupScreen: () => dispatch(push(routes.signup)),
  signin: (body) => dispatch(login(body)),
  goToPosts: () => dispatch(replace(routes.posts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
