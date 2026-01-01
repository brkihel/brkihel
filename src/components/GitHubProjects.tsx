import React, { useEffect, useState } from 'react'

type Repo = {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  private: boolean
  stargazers_count: number
}

type Props = {
  username: string
  limit?: number
}

export default function GitHubProjects({ username, limit = 6 }: Props) {
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)

    fetch(`https://api.github.com/users/${username}/repos?per_page=${limit}&sort=updated`)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (!mounted) return
        // Map to our Repo type (keep only needed fields)
        const mapped: Repo[] = data.map((r: any) => ({
          id: r.id,
          name: r.name,
          description: r.description,
          html_url: r.html_url,
          language: r.language,
          private: r.private,
          stargazers_count: r.stargazers_count,
        }))
        setRepos(mapped)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err.message)
        setRepos([])
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [username, limit])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: Math.min(limit, 4) }).map((_, i) => (
          <div key={i} className="p-4 rounded-lg bg-slate-900/50 animate-pulse h-28" />
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-sm text-red-400">Erro ao carregar repositórios: {error}</div>
  }

  if (!repos || repos.length === 0) {
    return <div className="text-sm text-slate-300/80">Nenhum repositório público encontrado.</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-lg bg-slate-900/60 hover:bg-slate-900 transition"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-amber-100">{repo.name}</h3>
            <span className="text-xs text-slate-400/80">{repo.private ? 'Private' : 'Public'}</span>
          </div>
          <p className="text-slate-300/80 text-sm mt-2 mb-3">{repo.description ?? 'Sem descrição'}</p>
          <div className="flex items-center justify-between text-sm text-slate-400">
            <div className="flex items-center gap-2">
              {repo.language && (
                <span className="px-2 py-1 rounded-full text-xs bg-slate-800/60">{repo.language}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor" />
              </svg>
              <span>{repo.stargazers_count}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
