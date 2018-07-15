import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

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
                <div style={styler} key={post.id}>
                div - #{post.id}
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