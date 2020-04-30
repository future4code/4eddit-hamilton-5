import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts, createPost, vote, getPostDetails } from "../../actions/posts";
import { replace } from "connected-react-router"
import { routes } from "../Router/index";

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
const WrapperCreatePost = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #ffffff;
  margin-bottom: 60px;
  padding: 30px;
  padding-top: 0px;
`

const TextLabel = styled.label`
  font-size: 1.2em;
`

const InputCreatePost = styled.input` 
	border-radius: 5px;
	height: 30px;
  width: 100%;
  margin-bottom: 30px;
  font-size: 1.2em;
`
const TextAreaCreatePost = styled.textarea` 
  width: 100%;
  border-radius: 5px;
  margin-bottom: 30px;
  font-size: 1.2em;
`
const WrapperTitle = styled.div`
  width: 45%;
  display: flex;
  align-items: flex-start;
  padding-left: 15px;
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
    filterText: "",
    selectValue: ""
  };

  componentDidMount() {
    this.props.getPosts();
    const token = localStorage.getItem("token")
    if (token === null) {
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

  handleInputSearch = (e) => {
    this.setState({filterText: e.target.value})
  }

  handleSelect = (e) => {
    this.setState({selectValue: e.target.value})
  }

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

  renderIconLike = (postId, direction) => {
    if (direction === 0 || direction === -1) {
     return <ImageVote src={arrowUpGrey}
     onClick={() => this.handleLikeButton(postId, direction)}
   />
    } else {
      return <ImageVote src={arrowUpColor}
      onClick={() => this.handleLikeButton(postId, direction)}
    />
    }
  }

  renderIconDislike  = (postId, direction) => {
    if (direction === 0 || direction === 1) {
     return <ImageVote src={arrowDownGrey}
     onClick={() => this.handleDislikeButton(postId, direction)}
   />
    } else {
      return <ImageVote src={arrowDownColor}
      onClick={() => this.handleDislikeButton(postId, direction)}
    />
    }
  }

  render() {
    const filterPosts = this.props.posts.filter(post => { 
      if(this.state.filterText === "") {
        return (
          post
        )
      } else {
        const search = this.state.filterText.toLowerCase()
        return post.title && post.title.toLowerCase().includes(search)
      }
    })

    return (
      <>
        <Header />
        <MainWrapper>
          <WrapperCreatePost>
            <h1>Criar Post</h1>
            <TextLabel htmlFor="title">Título</TextLabel>
            <InputCreatePost
              required
              type="text"
              name="title"
              value={this.state.newPost.title}
              onChange={this.handleInputChange}
            />

            <br />

            <TextLabel htmlFor="text">Post</TextLabel>
            <TextAreaCreatePost
              required
              type="text"
              name="text"
              rows="5"
              value={this.state.newPost.text}
              onChange={this.handleInputChange}
            />
            <Button color="secondary" variant="contained" type="submit" onClick={this.handleCreatePost}>Enviar</Button>
          </WrapperCreatePost>


          <input
            value= {this.state.filterText}
            onChange= {this.handleInputSearch}
          />
          
          <select value = {this.state.selectValue} onChange = {this.handleSelect}>
            <option value = {"like"}>Mais Curtidos</option>
            <option value = {"comments"}>Mais Comentados</option>
          </select>


          <WrapperTitle>
            <h1>Posts:</h1>
          </WrapperTitle>
          {this.props.posts &&
            filterPosts.map((posts) => {
              return (
                <MainWrapperPost key={posts.id}>

                  <WrapperVote key = {posts.username}>
                    {this.renderIconLike(posts.id, posts.userVoteDirection)}
                    <p>{posts.votesCount}</p>
                    {this.renderIconDislike(posts.id, posts.userVoteDirection)}
                  </WrapperVote>

                  <WrapperPost key = {posts.title}>
                    <h2>{posts.title}</h2> 
                    <p><strong>{posts.username}: </strong> {posts.text}</p>
                  </WrapperPost>
                  <WrapperButton>
                    <Button color="secondary" variant="contained" type="submit" onClick={() => this.props.getPostDetails(posts.id)}>Comentários: {posts.commentsCount}</Button>
                  </WrapperButton>
                </MainWrapperPost>
              );
            })}
        </MainWrapper>
      </>
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
