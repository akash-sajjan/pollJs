import React, { FC, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Card from "../components/Card";
import { getPosts } from "../redux/actions/action";
import FlatList from "flatlist-react";

interface Props {
  getPosts: Function;
  posts: any;
}

const Home: FC<Props> = ({ getPosts, posts }): JSX.Element => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(10);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      let scrollTop = document.documentElement.scrollTop,
        windowHeight = window.innerHeight,
        height = document.body.scrollHeight - windowHeight,
        scrollPercentage = scrollTop / height;
      if (scrollPercentage > 1) {
        let newSize = size + 10;
        setSize(newSize);
        setPage(page + 1);
      }
    });
  });

  useEffect(() => {
    getPost(page);
  }, [page]);

  useEffect(() => {
    const interval = setInterval(async () => {
      setPage(page + 1);
      console.log("10 Seconds");
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [page]);

  const getPost = async (pageNum: number) => {
    setLoading(true);
    await getPosts(pageNum);
    // console.log(posts);
    setLoading(false);
  };

  return (
    <div>
      <div>
        <h4>Posts</h4>
      </div>
      {/* <FlatList
        data={posts}
        keyExtractor={(post: any) => post.key}
        renderItem={(postData: any) => <Card post={postData} />}
        ListEmptyComponent={<h2>No Posts found</h2>}
        onEndReached={() => {
          setLoading(true);
          setPage(page + 1);
        }}
        onEndReachedThreshold={0.1}
        refreshing={loading}
        style={{ height: "100%" }}
      /> */}
      {posts.map((postData: any) => (
        <Card post={postData} />
      ))}
      {/* <FlatList list={posts} renderItem={(postData: any) => <Card post={postData} />} renderWhenEmpty={() => <div>No Posts found</div>} loadMoreItems={fetch} /> */}

      {/* <FlatList
        data={posts}
        keyExtractor={(post: any) => post.key}
        renderItem={(postData) => (
          <Card navigation={navigation} post={postData} />
        )}
        ListEmptyComponent={<Text>No Posts found</Text>}
        onEndReached={() => {
          setLoading(true);
          setPage(page + 1);
        }}
        onEndReachedThreshold={0.1}
        refreshing={loading}
        style={{ height: "100%" }}
      /> */}

      <div>{loading && "Loading..."}</div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  posts: state.reducer.posts,
});

export default connect(mapStateToProps, { getPosts })(Home);
