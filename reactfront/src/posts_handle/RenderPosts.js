import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import './feed.css'
const styler = {
    height: 50,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };
  

class PostsNav extends React.Component {
    state = {
        pageno:0,
        hasMore:true,
        results:[],
      };

    componentDidMount(){
        fetch(`http://localhost:8000/api/post/?page=${this.state.pageno+1}`, {
        headers: {
            Authorization: `JWT ${this.props.userToken}`,
        }
        })
        .then(res => res.json())
        .then(json => {
            this.setState({
                // results: [...this.state.results, json.results],
                results:this.state.results.concat(json.results),
                pageno:this.state.pageno + 1
            });
            
            console.log(this.state.results)
        });
    }
          
    

    fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        fetch(`http://localhost:8000/api/post/?page=${this.state.pageno+1}`, {
        headers: {
            Authorization: `JWT ${this.props.userToken}`,
        }
        })
        .then(res => res.json())
        .then(json => {      
            this.setState({
                
                // results: [...this.state.results, json.results],
                results:this.state.results.concat(json.results),
                pageno:this.state.pageno + 1
            });
            if(this.state.pageno===json.num_pages){
                this.setState({
                   hasMore:false
                });
            }
            console.log(this.state.results)
        });
      }
      render() {
        return (
          <div>
            <h1>Posts in your college</h1>
            <hr />
            <InfiniteScroll
              dataLength={this.state.results.length+18}
              next={this.fetchMoreData}
              hasMore={this.state.hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {this.state.results.map( post => (
                <div class="postcontainer" key={post.id}>
                <div class="topbar">post user details</div>
                <div class="textspace">{post.post_text}</div>
                <div class="content">
                {'C:\\PythonCourse\\MRND Summer\\Apps Course\\mycollege\\'+post.content_url}
                </div>
                <div class="postimage"><img class="postimage" 
                src={require('C:\\PythonCourse\\MRND Summer\\Apps Course\\mycollege\\'+post.content_url)}>
                </img></div>
                </div>
            ))}
              
            </InfiniteScroll>
          </div>
        );
      }

}

export default PostsNav;

PostsNav.propTypes = {
    userToken : PropTypes.string.isRequired,
};
/*<img class="postimage" 
                src={require('../../../'+post.content_url)}>
                </img>*/