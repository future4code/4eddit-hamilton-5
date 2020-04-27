import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const WrapperComment = styled.div`
  border: 1px solid black;
  text-align: center;
  width: 400px;
  margin-bottom: 10px;
`;

class PostDetails extends Component {
  render() {
    return (
      <div>
        <div>
          <label>Escreva um comentário</label>
          <input></input>
        </div>
        {this.props.comments.map(comment => {
          return (
            <WrapperComment key={comment.id} >
              <p>Usuário: {comment.username} </p>
              <p>Comentário: {comment.text} </p>
                <div>
                  <p>{comment.votesCount}</p>
                </div>
            </WrapperComment>
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.posts.comments
})

export default connect(mapStateToProps)(PostDetails);


