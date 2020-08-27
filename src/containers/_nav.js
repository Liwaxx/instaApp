export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Posts']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Make New Post',
    to: '/post/new-post',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'My Post',
    to: '/post/my-post',
    icon: 'cil-pencil',
  },
]

