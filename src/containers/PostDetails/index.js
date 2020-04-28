import React, { Component } from "react";
import { connect } from "react-redux";
import routes from "../Router"
import { replace } from "connected-react-router"
import styled from "styled-components";
import { getPostDetails, createComment } from "../../actions/posts"

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

  componentDidMount () {
    console.log(this.props)
    const postId = this.props.match.params.id
    if(this.props.getPostDetails && postId){
     this.props.getPostDetails(postId)
    } else {
      this.props.goToPosts()
    }
  }

  handleComment = (e) => {
    this.setState({comment: e.target.value})
  }

  submitComment = (e) => {
    e.preventDefault()
    this.props.createComment(this.state.comment)
  }

  render() {
    return (
      <div>
        <div>Título do post: {this.props.post.title}</div>
        <div>Descrição do post: {this.props.post.text}</div>
        <div>
          <label htmlFor="comment">Escreva um comentário</label>
          <input name="comment" required value={this.state.comment} onChange={this.handleComment}/>
          <button onClick={this.submitComment}>Enviar</button>
        </div>
        {this.props.comments && this.props.comments.map(comment => {
          return (
            <WrapperComment key={comment.id} >
              <p>Usuário: {comment.username} </p>
              <p>Comentário: {comment.text} </p>
                <div>
                  <p>DIRECTION {comment.userVoteDirection} </p>
                  <p>{comment.votesCount}</p>
                  <button>Like</button>
                  <button>Dislike</button>
                </div>
            </WrapperComment>
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  post: state.posts.post,
  comments: state.posts.post.comments
})

const mapDispatchToProps = (dispatch) => ({
  createComment: (text) => dispatch(createComment(text)),
  getPostDetails: (postId) => dispatch(getPostDetails(postId)),
  goToPosts: () => dispatch(replace(routes.posts))
})


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);


