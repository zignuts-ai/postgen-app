// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'History',
    path: '/history',
    icon: 'material-symbols:history',
    auth: false
  },
  {
    title: 'New Chat',
    path: '/chat',
    icon: 'wpf:create-new',
    auth: false
  }

  // {
  //   title: 'Second Page',
  //   path: '/second-page',
  //   icon: 'bx:envelope',
  // },
  // {
  //   path: '/acl',
  //   action: 'read',
  //   subject: 'acl-page',
  //   title: 'Access Control',
  //   icon: 'bx:shield',
  // }
]

export default navigation
