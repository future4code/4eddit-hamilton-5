import React, { Component } from "react";
import { connect } from "react-redux";
import { push, replace } from "connected-react-router";
import { routes } from "../Router/index";
import { login } from "../../actions/users"
import Header from "../Header"
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const MainWrapperLogin = styled.div`
  height: 90vh;
  display: flex;
  align-items: center;
`

const LoginWrapper = styled.form`
  margin: 0 auto;
  gap: 10px;
  place-content: center;
  justify-items: center;
  display: grid;
`;

const ButtonStyled = styled(Button)`
  color: #ffffff;
`

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
      <>
        <Header />
        <MainWrapperLogin>
          <LoginWrapper onSubmit = {this.handleSubmit}>
            {loginForm.map((input) => {
              return (
                <div key={input.name}>
                  <TextField
                    label={input.label}
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
            <Button color="secondary" variant="contained" type="submit">Entrar</Button>
            <p>OU</p>
            <ButtonStyled color="primary" variant="contained" onClick={() => this.props.goToSignupScreen()}>Cadastrar</ButtonStyled>
          </LoginWrapper>
        </MainWrapperLogin>  
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  goToSignupScreen: () => dispatch(push(routes.signup)),
  signin: (body) => dispatch(login(body)), 
  goToPosts: () => dispatch(replace(routes.posts))
});

export default connect(null, mapDispatchToProps)(LoginPage);
