// Mock Profile Picture Generation Service
export const ProfilePictureService = {
  // Method 1: Generate avatar using Dicebear API
  async generateAvatarFromPrompt(prompt: string): Promise<string> {
    // Generates a consistent avatar based on the input prompt
    const sanitizedPrompt = prompt.toLowerCase().replace(/[^a-z0-9]/g, '')

    return `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${sanitizedPrompt}`
  },

  // Method 2: Generate avatar using UI Avatars
  async generateInitialsAvatar(name: string): Promise<string> {
    const encodedName = encodeURIComponent(name)

    return `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=random`
  },

  // Method 3: Generate random avatar from predefined set
  generateRandomAvatar(): string {
    const avatars = [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=6'
    ]

    return avatars[Math.floor(Math.random() * avatars.length)]
  },

  // Method 4: Placeholder image generation with specifics
  async generatePlaceholderAvatar(options?: { background?: string; color?: string; size?: number }): Promise<string> {
    const { background = 'e0e0e0', color = '333333', size = 200 } = options || {}

    return `https://via.placeholder.com/${size}/${background}/${color}?text=Profile`
  },

  // Simulated AI-like generation with some randomness
  async simulateAIGeneration(prompt: string): Promise<string> {
    // Simulate AI generation with some "intelligence"
    const keywords = ['creative', 'professional', 'fun', 'serious', 'modern']
    const styles = ['avataaars', 'bottts', 'fun-emoji', 'miniavs']

    // Use the prompt to influence the generation
    const stylePicker = prompt.toLowerCase().includes(keywords[0])
      ? styles[0]
      : styles[Math.floor(Math.random() * styles.length)]

    const seed = prompt.split(' ').join('-').toLowerCase()

    return `https://api.dicebear.com/7.x/${stylePicker}/svg?seed=${seed}`
  },

  // Fallback method if other methods fail
  getFallbackAvatar(): string {
    return '/images/avatars/default-avatar.png'
  }
}

// Example usage in component
export const useProfilePictureGenerator = () => {
  const generateProfilePicture = async (prompt: string) => {
    try {
      // Attempt AI-like generation first
      const aiGeneratedImage = await ProfilePictureService.simulateAIGeneration(prompt)

      return aiGeneratedImage
    } catch (error) {
      console.error('AI generation failed, falling back to alternative methods', error)

      // Fallback methods
      try {
        // Try generating from prompt
        return await ProfilePictureService.generateAvatarFromPrompt(prompt)
      } catch {
        // Last resort
        return ProfilePictureService.getFallbackAvatar()
      }
    }
  }

  return { generateProfilePicture }
}
