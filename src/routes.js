import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const MyPosts = React.lazy(() => import('./proj/pages/myPost'));
const NewPost = React.lazy(() => import('./proj/pages/newPost'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/post/new-post', name: 'New Post', component: NewPost },
  { path: '/post/my-post', name: 'My Post', component: MyPosts },
];

export default routes;
