import { Content } from 'src/types/contentTypes'
import { Page } from 'src/types/landing'

export const dataSample: Content[] = [
  {
    id: 1,
    image: 'https://via.placeholder.com/600x400.png?text=Cat+Meme',
    title: 'Hilarious Cat Meme',
    description: 'When your cat decides to judge your life choices',
    platform: 'Instagram',
    type: 'image',
    aiGenerated: true,
    createdAt: 1733576257
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/600x400.png?text=Dog+Meme',
    title: 'Dog Humor',
    description: 'When your dog is too excited for a walk and you have to catch up',
    platform: 'Twitter',
    type: 'image',
    aiGenerated: false,
    createdAt: 1733576257
  }
]

export const LANDING_DATA: Page = {
  template: 'innovate',
  theme: 'dark',
  header: {
    brand: {
      title: 'AI News Agent',
      avatar: {
        src: '/imgs/ai-logo.png',
        title: 'AI News Agent'
      },
      url: '/'
    },
    nav: {
      items: [
        {
          title: 'Challenge',
          url: '#challenge'
        },
        {
          title: 'Features',
          url: '#features'
        },
        {
          title: 'Workflow',
          url: '#workflow'
        },
        {
          title: 'About',
          url: '#about'
        }
      ]
    },
    buttons: [
      {
        title: 'Try Demo',
        url: '/demo'
      }
    ]
  },
  hero: {
    title: 'Transforming News into Engaging Content',
    description:
      'Build AI-driven daily news agents that summarize, generate, and repurpose content into multiple formats, enabling seamless information sharing.',
    image: {
      src: '/imgs/hero.png'
    },
    image_position: 'right',
    text_align: 'left',
    buttons: [
      {
        title: 'Explore Challenge',
        url: '#challenge'
      },
      {
        title: 'Try the AI Agent',
        url: '/demo'
      }
    ],
    show_happy_users: true,
    show_proof: true
  },
  section: {
    title: 'Our Innovation Platform',
    description: 'Discover the powerful features that set our AI News Agent apart.',
    items: [
      {
        // name: "challenge",
        title: 'AI NEWS AGENT',
        description:
          'Build an AI agent capable of summarizing and reformatting daily news into digestible content, making information more accessible for diverse audiences.',
        image: {
          src: '/imgs/section1-news.png'
        },
        image_position: 'left',
        text_align: 'center',
        items: [
          {
            title: 'Welcome to Our Innovation Platform',
            description:
              'Discover the tools, resources, and community to bring your innovative ideas to life. Collaborate, create, and achieve excellence together.'
          },
          {
            title: 'Empowering Creativity',
            description:
              'Unleash your potential with a platform designed to fuel creativity and foster innovation in every project.'
          },
          {
            title: 'Your Journey Starts Here',
            description:
              'Begin your journey toward building impactful solutions with our collaborative ecosystem tailored for success.'
          }
        ]
      },
      {
        name: 'features',
        title: 'AI Agent Features',
        description: 'Explore the key capabilities of the AI News Agent and how it can transform news consumption.',
        image: {
          src: '/imgs/section2-news.png'
        },
        image_position: 'right',
        text_align: 'center',
        items: [
          {
            title: 'Automated Summaries',
            description: 'Summarizes content instantly with high accuracy.'
          },
          {
            title: 'Customizable Outputs',
            description: 'Choose the format and style that suits your audience.'
          },
          {
            title: 'AI-Driven Insights',
            description: 'Identify key trends and insights from multiple sources.'
          }
        ]
      },
      {
        name: 'workflow',
        title: 'How It Works',
        description: 'Get started with the AI News Agent in three simple steps:',
        image: {
          src: '/imgs/section3-news.png'
        },
        image_position: 'left',
        text_align: 'center',
        items: [
          {
            title: '1. Input Content',
            description: 'Provide the news articles or feeds you want the agent to process.'
          },
          {
            title: '2. Choose a Format',
            description: 'Select the desired output format—summaries, scripts, infographics, or others.'
          },
          {
            title: '3. Deploy & Share',
            description: 'Share the generated content directly to your preferred platforms.'
          }
        ],
        buttons: [
          {
            title: 'Start Building',
            url: '/chat'
          }
        ]
      }
    ]
  },
  feature: {
    title: 'Key Features of AI News Agent',
    description: 'Discover the powerful features that set our AI News Agent apart.',
    items: [
      {
        title: 'Automated Summarization',
        description: 'Quickly summarize lengthy articles into bite-sized information.',
        avatar: {
          src: '/imgs/icons/1.svg'
        }
      },
      {
        title: 'Flexible Content Formats',
        description: 'Transform news into multiple formats tailored to various audiences.',
        avatar: {
          src: '/imgs/icons/2.svg'
        }
      },
      {
        title: 'Analytics Integration',
        description: 'Track the impact of your content with detailed analytics.',
        avatar: {
          src: '/imgs/icons/3.svg'
        }
      },
      {
        title: 'Customizable Templates',
        description: 'Select from a range of templates for professional-quality outputs.',
        avatar: {
          src: '/imgs/icons/4.svg'
        }
      }
    ]
  },
  cta: {
    title: 'Get Started with AI News Agent',
    description: 'Revolutionize how you create and share news content with our AI-powered tool.',
    buttons: [
      {
        title: 'Try Demo',
        url: '/chat'
      }
    ]
  },
  testimonial: {
    title: 'What People Are Saying',
    description: 'Hear from our users who have streamlined their workflows with the AI News Agent.',
    items: [
      {
        name: 'Alex Johnson',
        title: 'Journalist',
        description: 'The AI News Agent has drastically reduced the time it takes to prepare daily updates.',
        avatar: {
          src: '/imgs/user/1.png'
        }
      },
      {
        name: 'Sophia Martinez',
        title: 'Content Marketer',
        description: 'A game changer! I can now repurpose content efficiently for various platforms.',
        avatar: {
          src: '/imgs/user/2.png'
        }
      },
      {
        name: 'Chris Lee',
        title: 'Editor',
        description: 'It’s like having an extra pair of hands—our productivity has soared.',
        avatar: {
          src: '/imgs/user/3.png'
        }
      }
    ]
  },
  faq: {
    title: 'FAQs About AI News Agent',
    description: 'Your questions answered about our innovative AI tool.',
    items: [
      {
        title: 'How accurate is the summarization?',
        description: 'Our AI delivers highly accurate summaries with minimal manual adjustments needed.'
      },
      {
        title: 'Can I customize the output format?',
        description: 'Yes, you can choose from multiple formats like text, video, and graphics.'
      },
      {
        title: 'Is the agent suitable for all industries?',
        description: 'Absolutely! The AI News Agent is versatile and can adapt to various use cases.'
      }
    ]
  },
  footer: {
    brand: {
      title: 'AI News Agent',
      description:
        'AI News Agent transforms how news is consumed and shared, empowering users with versatile tools for content creation.',
      avatar: {
        src: '/imgs/ai-logo.png',
        title: 'AI News Agent'
      },
      url: '/'
    },
    badge_disabled: true,
    copyright: '© 2024 • AI News Agent. All rights reserved.',
    social: {
      items: [
        {
          title: 'Twitter',
          url: 'https://twitter.com/ainewsagent',
          target: '_blank'
        },
        {
          title: 'LinkedIn',
          url: 'https://linkedin.com/company/ainewsagent',
          target: '_blank'
        },
        {
          title: 'Email',
          url: 'mailto:support@ainewsagent.com',
          target: '_self'
        }
      ]
    }
  }
}
