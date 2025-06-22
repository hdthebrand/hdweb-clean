import Link from 'next/link';
import { Card, CardHeader, CardDescription } from '@/components/ui/card';
import { tools } from '@/lib/tools';
import { ArrowRight, Code } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">HD Web Tools</h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Your Ultimate Web Toolkit
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A curated collection of simple, powerful, and easy-to-use tools to boost your productivity.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map(tool => (
              <Link href={`/tools/${tool.slug}`} key={tool.slug} className="group">
                <Card className="flex h-full flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <tool.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-card-foreground">{tool.name}</h3>
                    </div>
                    <CardDescription className="flex-grow">{tool.description}</CardDescription>
                  </CardHeader>
                  <div className="px-6 pb-4">
                    <div className="flex items-center text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Open Tool <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <footer className="mt-auto border-t py-6 text-center text-sm text-muted-foreground">
         <div className="flex justify-center gap-6">
            <Link href="/about" className="hover:text-primary hover:underline">About Us</Link>
            <Link href="/contact" className="hover:text-primary hover:underline">Contact</Link>
            <Link href="/privacy-policy" className="hover:text-primary hover:underline">Privacy Policy</Link>
        </div>
        <p className="mt-4">&copy; {new Date().getFullYear()} HD Web Tools. All rights reserved.</p>
      </footer>
    </div>
  );
}
