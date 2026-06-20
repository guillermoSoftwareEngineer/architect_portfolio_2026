import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Habilita MDX en archivos .md y .mdx
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  output: 'export',
  basePath: '/architect_portfolio_2026',
  images: {
    unoptimized: true,
  },
}

const withMDX = createMDX({
  // Opciones opcionales de remark/rehype plugins aquí en el futuro
})

export default withMDX(nextConfig)

