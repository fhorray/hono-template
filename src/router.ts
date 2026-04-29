import fs from 'fs'
import path from 'path'

// Custom Vite plugin for automatic File-based Routing
export default function () {
  const virtualRoutesId = 'virtual:routes'
  const virtualRouterId = 'virtual:router'
  const resolvedRoutesId = '\0' + virtualRoutesId
  const resolvedRouterId = '\0' + virtualRouterId

  return {
    name: 'my-router-plugin',
    resolveId(id: string) {
      if (id === virtualRoutesId) return resolvedRoutesId
      if (id === virtualRouterId) return resolvedRouterId
      return null; // 🚀 Added explicit return
    },
    load(id: string) {
      // Current path updated to the new src/client/pages structure
      const pagesDir = path.resolve(process.cwd(), 'src/client/pages')

      const getFiles = (dir: string): string[] => {
        if (!fs.existsSync(dir)) return [];
        const subdirs = fs.readdirSync(dir)
        const files = subdirs.map((subdir) => {
          const res = path.resolve(dir, subdir)
          return fs.statSync(res).isDirectory() ? getFiles(res) : res
        })
        return files.flat()
      }

      if (id === resolvedRoutesId) {
        const allFiles = getFiles(pagesDir)
        const pageFiles = allFiles.filter(f => f.endsWith('page.tsx'))

        let imports = ''
        let routes = 'export const routes = [\n'

        pageFiles.forEach((fullPath, i) => {
          const name = `Page${i}`
          const normalizedPath = fullPath.replace(/\\/g, '/')
          imports += `import ${name} from '${normalizedPath}';\n`
          routes += `  { name: 'r${i}', component: ${name} },\n`
        })

        routes += '];'
        return imports + routes
      }

      if (id === resolvedRouterId) {
        const allFiles = getFiles(pagesDir)
        const pageFiles = allFiles.filter(f => f.endsWith('page.tsx'))

        const routeConfig: Record<string, string> = {}
        pageFiles.forEach((fullPath, i) => {
          const name = `r${i}`
          let urlPath = fullPath.replace(/\\/g, '/')
          const normalizedPagesDir = pagesDir.replace(/\\/g, '/')

          urlPath = urlPath
            .replace(normalizedPagesDir, '')
            .replace(/\/page\.tsx$/, '')
            .replace(/page\.tsx$/, '')

          if (urlPath === '') urlPath = '/'

          urlPath = urlPath.replace(/\[(\w+)\]/g, ':$1').replace(/\[\.\.\.all\]/g, '*')
          routeConfig[name] = urlPath
        })

        return `
          import { createRouter } from '@nanostores/router';
          export const $router = createRouter(${JSON.stringify(routeConfig)});
        `
      }

      return null; // 🚀 Added explicit return
    }
  }
}
