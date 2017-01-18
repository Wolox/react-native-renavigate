import PostDetailContainer from './PostDetailContainer';
import PostListContainer from './PostListContainer';

export default {
  DETAIL: (params) => ({
    component: PostDetailContainer,
    params
  }),
  LIST: (params) => ({
    component: PostListContainer,
    params
  })
};
