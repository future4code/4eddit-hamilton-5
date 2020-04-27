import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getPosts, createPost, vote } from "../../actions/posts";

const WrapperPost = styled.div`
  border: 1px solid black;
  text-align: center;
  width: 400px;
  margin-bottom: 10px;
`;

const CreatePost = styled.div`
  border: 1px solid black;
  width: 400px;
`;

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
      <div>
        <CreatePost>
          <label htmlFor="title">Título</label>

          <input
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

          <button onClick={this.handleCreatePost}>Enviar</button>
        </CreatePost>

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
                  <p>{posts.userVoteDirection}</p>
                  <p>Comentários: {posts.commentsCount}</p>
                </div>
              </WrapperPost>
            );
          })}
      </div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
