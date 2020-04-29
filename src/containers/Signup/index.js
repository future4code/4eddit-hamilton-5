import React, { Component } from "react";
import { signUp } from "../../actions/users";
import { connect } from "react-redux";
import { replace } from "connected-react-router";
import { routes } from "../Router/index";
import Header from "../Header"
import styled from "styled-components";

const Form = styled.form``;

const signupForm = [
  {
    name: "username",
    type: "text",
    label: "Nome de usuário",
    pattern: "[A-Za-zçÇ]{5,}",
    title: "Mínimo 5 caracteres",
  },
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
    pattern: "[A-Za-zçÇ]{6,}",
    title: "Mínimo 6 caracteres",
  },
];

class Signup extends Component {
  state = {
    form: {},
  };

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token !== null) {
      this.props.goToPosts()
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      form: { ...this.state.form, [name]: value },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state.form)
  };

  render() {
    return (
      <>
        <Header />
        <div>
          <Form onSubmit={this.handleSubmit}>
            {signupForm.map((input) => {
              return (
                <div key={input.name}>
                  <label htmlFor={input.name}>{input.label}</label>
                  <input
                    required
                    name={input.name}
                    type={input.type}
                    title={input.title}
                    pattern={input.pattern}
                    value={this.state.form[input.name] || ""}
                    onChange={this.handleInputChange}
                  />
                </div>
              );
            })}

            <button type="submit">Cadastrar</button>
          </Form>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUp: (body) => dispatch(signUp(body)),
  goToPosts: () => dispatch(replace(routes.posts))
});

export default connect(null, mapDispatchToProps)(Signup);
