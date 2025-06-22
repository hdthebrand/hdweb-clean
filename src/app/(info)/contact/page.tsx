import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the HD Web Tools team. We welcome your feedback, suggestions, and questions.',
};

export default function ContactPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground">
        <p>
          We value your feedback and are always here to help. Whether you have a question about one of our tools, a suggestion for a new feature, or just want to say hello, we'd love to hear from you.
        </p>
        <p>
          Please feel free to reach out to us via email. We do our best to respond to all inquiries as quickly as possible.
        </p>
        <div className="flex items-center gap-4 pt-4">
            <Mail className="h-6 w-6 text-primary" />
            <div>
                <h3 className="font-semibold text-foreground">Email Us</h3>
                <a href="mailto:hirendodiya515@gmail.com" className="text-primary hover:underline">
                    hirendodiya515@gmail.com
                </a>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
