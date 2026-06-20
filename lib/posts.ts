import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface PostMeta {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
}

export interface Post extends PostMeta {
  content: string
}

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!fs.existsSync(postsDirectory)) return []

  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.mdx') || f.endsWith('.md'))

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.(mdx|md)$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title ?? 'Sin Título',
      date: data.date ?? '',
      summary: data.summary ?? '',
      tags: data.tags ?? [],
    }
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const extensions = ['mdx', 'md']
  let fullPath = ''

  for (const ext of extensions) {
    const candidate = path.join(postsDirectory, `${slug}.${ext}`)
    if (fs.existsSync(candidate)) {
      fullPath = candidate
      break
    }
  }

  if (!fullPath) return null

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title ?? 'Sin Título',
    date: data.date ?? '',
    summary: data.summary ?? '',
    tags: data.tags ?? [],
    content,
  }
}
