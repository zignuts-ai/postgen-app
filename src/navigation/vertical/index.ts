// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'History',
      path: '/history',
      icon: 'material-symbols:history'
    },
    {
      title: 'New Chat',
      path: '/chat',
      icon: 'wpf:create-new',
      isPublic: true
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
}

export default navigation
