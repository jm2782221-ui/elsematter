// Everything you'd want to change lives here.
export const config = {
  name: 'ElseMatter',
  tagline: 'One question. Another reality.',
  bio: 'Animated “What If?” shorts about science and natural disasters, under a minute each.',

  latest: {
    title: 'What If the Doomsday Glacier Collapsed?',
    url: 'https://www.youtube.com/@elsematter/shorts', // ← swap for the episode's own link
  },

  channels: [
    { id: 'youtube', label: 'Watch on YouTube Shorts', handle: '@elsematter', url: 'https://www.youtube.com/@elsematter/shorts' },
    { id: 'tiktok', label: 'Follow on TikTok', handle: '@elsematterstudio', url: 'https://www.tiktok.com/@elsematterstudio' },
    { id: 'instagram', label: 'Watch on Instagram Reels', handle: '@elsemattersstudio', url: 'https://www.instagram.com/elsemattersstudio/' },
  ],

  recommended: [
    {
      id: 'tagpanda',
      name: 'TagPanda',
      blurb: 'Save the videos you love in one searchable library, and ask AI about them.',
      url: 'https://tagpanda.io', // ← replace with your TagPanda affiliate link
      affiliate: true,
    },
  ],
} as const
