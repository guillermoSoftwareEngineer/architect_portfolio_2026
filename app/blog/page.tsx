import { getAllPosts } from '@/lib/posts'

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-[#080808] text-gray-100 pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="text-xs font-mono text-blue-400 tracking-wider">BUILD LOGS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Arquitectura en <span className="text-blue-500">Proceso</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Documentación honesta de sistemas reales. No tutoriales. 
            Bitácoras de decisiones técnicas, errores y patrones que encontré construyendo.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="glass-panel p-12 text-center border border-dashed border-white/10">
            <p className="text-gray-500 font-mono text-sm mb-2">// próximamente</p>
            <p className="text-gray-400">El primer Build Log está en construcción.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} className="block">
                <article className="glass-panel p-8 group hover:border-blue-500/30 transition-all">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h2 className="text-xl font-semibold group-hover:text-blue-400 transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <span className="text-xs font-mono text-gray-600 whitespace-nowrap mt-1">{post.date}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{post.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag: string) => (
                      <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </a>
            ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-white/10">
          <a href="/" className="text-sm text-gray-500 hover:text-white transition-colors font-mono flex items-center gap-2">
            ← volver al portafolio
          </a>
        </div>
      </div>
    </main>
  )
}

