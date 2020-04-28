import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts, createPost, vote, getPostDetails } from "../../actions/posts";

import styled from "styled-components";
import Button from "@material-ui/core/Button";

const MainWrapper = styled.div`
  padding-top: 30px;
  background-color: #D9D9D9;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const WrapperCreatePost = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  margin-bottom: 60px;
  padding-bottom: 20px;
`;

const WrapperPost = styled.div`
  text-align: center;
  width: 45%;
  margin-bottom: 10px;
  background-color: #ffffff;
`;

const InputCreatePost = styled.input` 
	border-radius: 5px;
	height: 30px;
`

class Posts extends Component {
  state = {
    newPost: {
      text: "",
      title: "",
    },
  };

  componentDidMount() {
    this.props.getPosts();
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      newPost: { ...this.state.newPost, [name]: value },
    });
  };

  handleCreatePost = (e) => {
    e.preventDefault();

    this.props.createPost(this.state.newPost);
    this.setState({
      newPost: { text: "", title: "" },
    });
  };

  handleLikeButton = (id, likeDirection) => {
    if (likeDirection === 0 || likeDirection === -1) {
      this.props.vote(1, id);
    } else {
      this.props.vote(0, id);
    }
  };

  handleDislikeButton = (id, likeDirection) => {
    if (likeDirection === 0 || likeDirection === 1) {
      this.props.vote(-1, id);
    } else {
      this.props.vote(0, id);
    }
  };

  render() {
    return (
      <MainWrapper>
         <h2>Criar Post</h2>
        <WrapperCreatePost>
          <label htmlFor="title">Título</label>
          <InputCreatePost
            required
            type="text"
            name="title"
            value={this.state.newPost.title}
            onChange={this.handleInputChange}
          />

          <br />

          <label htmlFor="text">Post</label>
          <textarea
            required
            type="text"
            name="text"
            rows="5"
            value={this.state.newPost.text}
            onChange={this.handleInputChange}
          />

          <Button color="primary" variant="contained" type="submit" onClick={this.handleCreatePost}>Enviar</Button>
        </WrapperCreatePost>
        <h2>Posts populares:</h2>
        {this.props.posts &&
          this.props.posts.map((posts) => {
            return (
              <WrapperPost key={posts.id}>
                <p>Usuário: {posts.username}</p>
                <p>Título: {posts.title}</p>
                <p>Post: {posts.text}</p>
                <div>
                  <button
                    onClick={() =>
                      this.handleLikeButton(posts.id, posts.userVoteDirection)
                    }
                  >
                    Like
                  </button>
                  <p>Likes: {posts.votesCount}</p>
                  <button
                    onClick={() =>
                      this.handleDislikeButton(
                        posts.id,
                        posts.userVoteDirection
                      )
                    }
                  >
                    Dislike
                  </button>
                  <Button color="secondary" variant="contained" type="submit" onClick={()=> this.props.getPostDetails(posts.id)}>Comentários: {posts.commentsCount}</Button>
                </div>
              </WrapperPost>
            );
          })}
      </MainWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

const mapDispatchToProps = (dispatch) => ({
  getPosts: () => dispatch(getPosts()),
  createPost: (post) => dispatch(createPost(post)),
  vote: (direction, id) => dispatch(vote(direction, id)),
  getPostDetails: (postId) => dispatch(getPostDetails(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
