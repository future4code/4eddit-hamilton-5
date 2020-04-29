import React, { Component } from "react";
import { connect } from "react-redux";
import { routes } from "../Router"
import { replace } from "connected-react-router"
import { getPostDetails, createComment, voteComment } from "../../actions/posts"
import Header from "../Header"
import styled from "styled-components";

const WrapperComment = styled.div`
  border: 1px solid black;
  text-align: center;
  width: 400px;
  margin-bottom: 10px;
`

class PostDetails extends Component {
  state = {
    comment: ""
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    const postId = this.props.match.params.id

    if (token === null) {
      this.props.goToLoginPage()
    }

    if (this.props.getPostDetails && postId) {
      this.props.getPostDetails(postId)
    } else {
      this.props.goToPosts()
    }
  }

  handleComment = (e) => {
    this.setState({ comment: e.target.value })
  }

  submitComment = (e) => {
    e.preventDefault()
    const postId = this.props.match.params.id
    this.props.createComment(this.state.comment, postId)

    this.setState({ comment: "" })
  }

  handleLikeButton = (commentId, likeDirection) => {
    const postId = this.props.match.params.id
    if (likeDirection === 0 || likeDirection === -1) {
      this.props.voteComment(1, commentId, postId);
    } else {
      this.props.voteComment(0, commentId, postId);
    }
  };

  handleDislikeButton = (commentId, likeDirection) => {
    const postId = this.props.match.params.id
    if (likeDirection === 0 || likeDirection === 1) {
      this.props.voteComment(-1, commentId, postId);
    } else {
      this.props.voteComment(0, commentId, postId);
    }
  };

  render() {
    return (
      <>
        <Header />
        <div>
          <div>Título do post: {this.props.post.title}</div>
          <div>Descrição do post: {this.props.post.text}</div>
          <div>
            <label htmlFor="comment">Escreva um comentário</label>
            <input name="comment" required value={this.state.comment} onChange={this.handleComment} />
            <button onClick={this.submitComment}>Enviar</button>
          </div>
          {this.props.comments && this.props.comments.map(comment => {
            return (
              <WrapperComment key={comment.id} >
                <p>Usuário: {comment.username} </p>
                <p>Comentário: {comment.text} </p>
                <div>
                  <p>DIRECTION {comment.userVoteDirection} </p>
                  <p> Likes {comment.votesCount}</p>
                  <button onClick={() => this.handleLikeButton(comment.id, comment.userVoteDirection)}>Like</button>
                  <button onClick={() => this.handleDislikeButton(comment.id, comment.userVoteDirection)} > Dislike</button>
                </div>
              </WrapperComment>
            )
          })}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  post: state.posts.post,
  comments: state.posts.post.comments
})

const mapDispatchToProps = (dispatch) => ({
  createComment: (text, postId) => dispatch(createComment(text, postId)),
  getPostDetails: (postId) => dispatch(getPostDetails(postId)),
  goToPosts: () => dispatch(replace(routes.posts)),
  voteComment: (direction, commentId, postId) => dispatch(voteComment(direction, commentId, postId)),
  goToLoginPage: () => dispatch(replace(routes.login))
})


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);


