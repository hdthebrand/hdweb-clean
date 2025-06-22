import { notFound } from 'next/navigation';
import { tools } from '@/lib/tools';
import { Card, CardHeader, CardDescription, CardContent } from '@/components/ui/card';
import ToolRenderer from '@/components/tool-renderer';
import type { Metadata, ResolvingMetadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const tool = tools.find((t) => t.slug === params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
      description: 'The tool you are looking for does not exist.',
    };
  }

  const fullDescription = `${tool.description} Learn how to use this tool and why it's useful.`;

  return {
    title: tool.name,
    description: fullDescription,
    alternates: {
      canonical: `/tools/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.name} - HD Web Tools`,
      description: fullDescription,
      url: `/tools/${tool.slug}`,
    },
  };
}


export async function generateStaticParams() {
  return tools.map(tool => ({
    slug: tool.slug,
  }));
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = tools.find(t => t.slug === params.slug);

  if (!tool) {
    notFound();
  }

  const detailsContent = tool.details
    ? tool.details.split('### ').filter(Boolean).map(section => {
        const [title, ...contentParts] = section.split(/\r?\n/);
        const contentParagraphs = contentParts.join('\n').trim().split('\n\n').filter(p => p.trim() !== '');
        return {
          title: title.trim(),
          content: contentParagraphs,
        };
      })
    : [];

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <tool.icon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold leading-none tracking-tight text-card-foreground">{tool.name}</h1>
            <CardDescription className="mt-1">{tool.description}</CardDescription>
          </div>
        </CardHeader>
        {/* AdSense Placeholder */}
        <div className="my-4 flex justify-center">
            <div style={{ width: '100%', height: '90px', backgroundColor: '#f0f4ef', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 24px', borderRadius: 'var(--radius)', border: '1px dashed hsl(var(--border))' }}>
                <p className="text-sm text-muted-foreground">Ad Placeholder</p>
            </div>
        </div>
        <CardContent>
          <div className="pt-4 border-t">
            <ToolRenderer slug={params.slug} />
          </div>
        </CardContent>
      </Card>

      {detailsContent.length > 0 && (
        <Card className="shadow-lg mt-8">
            <CardHeader>
                <h2 className="text-xl font-semibold">About the {tool.name}</h2>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                    {detailsContent.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-lg">{item.title}</AccordionTrigger>
                        <AccordionContent className="space-y-4 text-base text-muted-foreground">
                            {item.content.map((paragraph, pIndex) => (
                                <p key={pIndex}>{paragraph}</p>
                            ))}
                        </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
      )}
    </div>
  );
}

export const dynamicParams = false;
