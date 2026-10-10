import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const SOCIAL_LINKS = [
  { name: 'GitHub', icon: Github, url: 'https://github.com' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
  { name: 'X', icon: Twitter, url: 'https://x.com' },
  { name: 'Email', icon: Mail, url: 'mailto:hello@aniket.one' },
];

export function FooterSection() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container-tight">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-text-dim text-sm">
            &copy; {new Date().getFullYear()} Aniket Mishra. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-dim hover:text-text transition-colors"
                aria-label={link.name}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
