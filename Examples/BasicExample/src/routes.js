import PostsList from './PostsList';
import PostDetail from './PostDetail';

export default {
  DETAIL: (post) => ({
    component: PostDetail,
    params: { post }
  }),
  LIST: () => ({
    component: PostsList
  })
};
