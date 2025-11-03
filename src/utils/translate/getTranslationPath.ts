import { fileURLToPath } from 'url'

export const getTranslationPath = (url: string): string => {
  const filePath = fileURLToPath(url)

  const repoMatch = filePath.match(/trackplay-([a-zA-Z0-9_-]+)/)
  const repoName = repoMatch?.[1] ?? 'unknown'

  const relativeToSrcOrDist = filePath.split('/src/')[1] ?? filePath.split('/dist/')[1] ?? ''
  const withoutExt = relativeToSrcOrDist.replace(/\.[cm]?[tj]s$/, '')
  const dotPath = withoutExt.replaceAll('/', '.')

  return `${repoName}.${dotPath}`
}
