import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts, createPost, vote, getPostDetails } from "../../actions/posts";
import { replace } from "connected-react-router"
import { routes } from "../Router/index";

import styled from "styled-components";
import Button from "@material-ui/core/Button";
import arrowUpGrey from "../../img/arrow-up-grey.png"
import arrowUpColor from "../../img/arrow-up-color.png"
import arrowDownGrey from "../../img/arrow-down-grey.png"
import arrowDownColor from "../../img/arrow-down-color.png"


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
  align-items: flex-start;
  background-color: #ffffff;
  margin-bottom: 60px;
  padding: 30px;
  padding-top: 0px;
  font-size: 1.5em;
`;

const InputCreatePost = styled.input` 
	border-radius: 5px;
	height: 30px;
  width: 100%;
  margin-bottom: 30px;
`
const TextAreaCreatePost = styled.textarea` 
  width: 100%;
  border-radius: 5px;
  margin-bottom: 30px;
`
const MainWrapperPost = styled.div`
  text-align: center;
  width: 45%;
  margin-bottom: 20px;
  padding-bottom: 15px;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 1fr 8fr;
  grid-template-rows: 4fr 1fr;
`

const WrapperVote = styled.div`
  grid-column-start: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const WrapperPost = styled.div`
  grid-column-start: 2;
  grid-row-start: 1;
  grid-row-end: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
  font-size: 1.2em;
  text-align: left;
`
const WrapperButton = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  display: flex;
  align-items: center;
  padding-left: 15px;
`

const ImageVote = styled.img`
  height: 30px;
  object-fit: contain;
  cursor: pointer;
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
    const token = localStorage.getItem("token")
    if(token === null) {
      this.props.goToLoginPage()
    }
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
        <WrapperCreatePost>
        <h1>Criar Post</h1>
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
          <TextAreaCreatePost
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
              <MainWrapperPost key={posts.id}>

                <WrapperVote>
                  <ImageVote src={arrowUpGrey}
                    onClick={() =>this.handleLikeButton(posts.id, posts.userVoteDirection)}
                  />
                  <p>{posts.votesCount}</p>
                  <ImageVote src={arrowDownGrey}
                    onClick={() => this.handleDislikeButton(posts.id, posts.userVoteDirection)}
                  />
                </WrapperVote>

                <WrapperPost>
                  <h2>{posts.title}</h2>
                  <p><strong>Usuário:</strong> {posts.username}</p>
                  <p>{posts.text}</p>
                </WrapperPost>
                <WrapperButton>
                  <Button color="primary" variant="contained" type="submit" onClick={()=> this.props.getPostDetails(posts.id)}>Comentários: {posts.commentsCount}</Button>
                </WrapperButton>
              </MainWrapperPost>
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
  getPostDetails: (postId) => dispatch(getPostDetails(postId)),
  goToLoginPage: () => dispatch(replace(routes.login))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
