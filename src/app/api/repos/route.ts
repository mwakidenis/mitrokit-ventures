// src/app/api/repos/route.ts - Cloudflare Workers compatible
import { NextResponse } from 'next/server';

// Edge runtime for Cloudflare compatibility
export const runtime = 'edge';

// Get GitHub token from environment (Cloudflare binding or env var)
function getGitHubToken(): string | undefined {
  // Try Cloudflare binding first
  if (typeof process !== 'undefined' && process.env) {
    return process.env.GITHUB_TOKEN;
  }
  return undefined;
}

export async function GET() {
  const GITHUB_TOKEN = getGitHubToken();

  try {
    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: 'GitHub token not configured' },
        { status: 500 }
      );
    }

    // Fetch repositories from GitHub using Cloudflare-compatible fetch
    const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'mitrokit-ventures',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || 'Failed to fetch repositories' },
        { status: response.status }
      );
    }

    const repos = await response.json();

    // Filter and map repositories to project format
    const projects = repos
      .filter((repo: any) => !repo.fork || repo.stargazers_count > 0)
      .map((repo: any) => ({
        id: repo.id,
        title: repo.name,
        description: repo.description || 'No description available',
        type: categorizeRepo(repo.name, repo.topics),
        technology: extractTechStack(repo.topics, repo.language),
        year: new Date(repo.updated_at).getFullYear().toString(),
        stats: {
          stars: repo.stargazers_count || '0',
          forks: repo.forks_count || '0',
        },
        color: getRandomColor(),
        link: repo.html_url,
        github: repo.html_url,
      }));

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function categorizeRepo(name: string, topics: string[]): string {
  const topicString = (topics || []).join(' ').toLowerCase();
  const nameLower = name.toLowerCase();

  if (topicString.includes('school') || topicString.includes('education') || topicString.includes('student')) {
    return 'Education';
  }
  if (topicString.includes('finance') || topicString.includes('payment') || topicString.includes('mpesa') || topicString.includes('billing')) {
    return 'FinTech';
  }
  if (topicString.includes('ai') || topicString.includes('ml') || topicString.includes('machine-learning') || topicString.includes('tensorflow')) {
    return 'AI/ML';
  }
  if (topicString.includes('erp') || topicString.includes('enterprise')) {
    return 'ERP';
  }
  if (topicString.includes('network') || topicString.includes('router') || topicString.includes('hotspot')) {
    return 'Network';
  }
  if (topicString.includes('ecommerce') || topicString.includes('shop') || topicString.includes('store') || topicString.includes('mall')) {
    return 'E-commerce';
  }
  return 'Other';
}

function extractTechStack(topics: string[], language: string): string {
  const techStack: string[] = [];
  
  if (language) {
    techStack.push(language);
  }

  const topicMapping: Record<string, string> = {
    'react': 'React',
    'nextjs': 'Next.js',
    'nodejs': 'Node.js',
    'python': 'Python',
    'php': 'PHP',
    'laravel': 'Laravel',
    'flutter': 'Flutter',
    'firebase': 'Firebase',
    'redux': 'Redux',
    'typescript': 'TypeScript',
    'javascript': 'JavaScript',
    'postgresql': 'PostgreSQL',
    'mysql': 'MySQL',
    'sqlite': 'SQLite',
    'tailwind': 'Tailwind CSS',
    'bootstrap': 'Bootstrap',
    'android': 'Android',
    'kotlin': 'Kotlin',
    'vercel': 'Vercel',
    'aws': 'AWS',
    'prisma': 'Prisma',
    'tensorflow': 'TensorFlow',
  };

  (topics || []).forEach((topic: string) => {
    const mapped = topicMapping[topic.toLowerCase()];
    if (mapped && !techStack.includes(mapped)) {
      techStack.push(mapped);
    }
  });

  return techStack.slice(0, 5).join(', ');
}

function getRandomColor(): string {
  const colors = [
    '#00F5FF', '#ff9500', '#39FF14', '#FF3CAC', '#0070F3',
    '#ff0000', '#FF6600', '#FF9900', '#00FFAA', '#a855f7',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
