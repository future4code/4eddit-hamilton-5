import React, { Component } from "react";
import { connect } from "react-redux";
import { routes } from "../Router"
import { replace } from "connected-react-router"
import { getPostDetails, createComment, voteComment } from "../../actions/posts"
import Header from "../Header"
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import arrowUpGrey from "../../img/arrow-up-grey.png"
import arrowUpColor from "../../img/arrow-up-color.png"
import arrowDownGrey from "../../img/arrow-down-grey.png"
import arrowDownColor from "../../img/arrow-down-color.png"

const MainWrapper = styled.div`
  min-height: 100vh;
  padding-top: 30px;
  background-color: #D9D9D9;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const MainWrapperComments = styled.div` 
  text-align: center;
  width: 45%;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 1fr 8fr;
`

const WrapperPost = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #ffffff;
  margin-bottom: 60px;
  padding: 20px;
  padding-top: 0;
`
const PostDescription = styled.p`
  font-size: 1.2em;
`

const WrapperCreateComment = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2em;
  width: 100%;
  margin-top: 20px;
`
const WrapperSubmitComment = styled.div`
  display: flex;
`

const TextAreaCreateComment = styled.textarea`
  border-radius: 5px;
  width: 80%;
  margin-right: 10px;
  font-size: 0.8em;
`

const WrapperComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  font-size: 1.2em;
`

const ImageVote = styled.img`
  height: 30px;
  object-fit: contain;
  cursor: pointer;
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

  renderIconLike = (commentId, direction) => {
    if (direction === 0 || direction === -1) {
     return <ImageVote src={arrowUpGrey}
     onClick={() => this.handleLikeButton(commentId, direction)}
   />
    } else {
      return <ImageVote src={arrowUpColor}
      onClick={() => this.handleLikeButton(commentId, direction)}
    />
    }
  }

  renderIconDislike  = (commentId, direction) => {
    if (direction === 0 || direction === 1) {
     return <ImageVote src={arrowDownGrey}
     onClick={() => this.handleDislikeButton(commentId, direction)}
   />
    } else {
      return <ImageVote src={arrowDownColor}
      onClick={() => this.handleDislikeButton(commentId, direction)}
    />
    }
  }

  render() {
    return (
      <>
        <Header />
        <MainWrapper>
          <WrapperPost>
            <h1>{this.props.post.title}</h1>
            <PostDescription><strong>{this.props.post.username}: </strong>{this.props.post.text}</PostDescription>

            <WrapperCreateComment>
              <label htmlFor="comment">Escreva um comentário</label>
              <WrapperSubmitComment>
                <TextAreaCreateComment rows="2" name="comment" required value={this.state.comment} onChange={this.handleComment} />
                <Button color="secondary" variant="contained" type="submit" onClick={this.submitComment}>Comentar</Button>
              </WrapperSubmitComment>
            </WrapperCreateComment>
          </WrapperPost>

          {this.props.comments && this.props.comments.map(comment => {
            return (
              <MainWrapperComments key = {comment.id}>
                <div>
                  {this.renderIconLike(comment.id, comment.userVoteDirection)}
                  <p>{comment.votesCount}</p>
                  {this.renderIconDislike(comment.id, comment.userVoteDirection)}
                </div>

                <WrapperComment key={comment.id} >
                  <p><strong>{comment.username}: </strong>{comment.text} </p>
                </WrapperComment>
              </MainWrapperComments>
            )
          })}
        </MainWrapper>
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


