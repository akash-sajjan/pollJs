import http from "../../http/http";
import CONSTS from "../../constants/consts";
import { Dispatch } from "redux";

const getPosts = (page: number) => (dispatch: Dispatch) => {
  console.log("pageNo:", page);
  return http.get(`search_by_date?tags=story&page=${page}`).then((res) => {
    if (res && res.data) {
      const posts: Array<any> = res.data.hits.map((rs: any) => {
        rs.key = (Math.random() * 1000000).toString();
        return rs;
      });
      dispatch({ type: CONSTS.GET_POSTS, data: posts });
      console.log("posts");
      console.log("::::::::::::::::::::::::::::::::::::::::::::::");
    }
  });
};

export { getPosts };
