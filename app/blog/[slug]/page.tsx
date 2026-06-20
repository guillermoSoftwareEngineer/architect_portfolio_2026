import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Guillermo Vásquez`,
    description: post.summary,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-[#080808] text-gray-100 pt-32 pb-24 px-6">
      <article className="max-w-2xl mx-auto">
        
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags?.map((tag: string) => (
              <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-500">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 font-mono">
            <span>{post.date}</span>
            <span>·</span>
            <span>Guillermo Vásquez</span>
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-white
          prose-p:text-gray-300 prose-p:leading-relaxed
          prose-strong:text-white
          prose-code:text-blue-400 prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-black/60 prose-pre:border prose-pre:border-white/10
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-blue-500 prose-blockquote:text-gray-400
        ">
          {post.content}
        </div>

        <footer className="mt-16 pt-8 border-t border-white/10">
          <a href="/blog" className="text-sm text-gray-500 hover:text-white transition-colors font-mono flex items-center gap-2">
            ← volver a los Build Logs
          </a>
        </footer>

      </article>
    </main>
  )
}

