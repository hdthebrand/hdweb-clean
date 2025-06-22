import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about HD Web Tools and our mission to provide free and easy-to-use online utilities.',
};

export default function AboutPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About HD Web Tools</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground">
        <p>
          Welcome to HD Web Tools, your go-to destination for a wide range of free online utilities. Our mission is to make everyday digital tasks simpler and more accessible for everyone, from students and professionals to developers and creative artists.
        </p>
        <p>
          We started with a simple idea: what if there was a single, reliable website where you could find all the basic tools you need without having to download software or deal with complicated interfaces? That's how HD Web Tools was born. We believe in the power of simplicity and efficiency, which is why all our tools are designed to be intuitive, fast, and completely free to use.
        </p>
        <p>
          Our collection of tools is constantly growing. We cover everything from text analysis and password generation to image editing and unit conversions. Each tool is built with care, focusing on user privacy and a clean, straightforward experience. All processing happens directly in your browser, meaning your data stays with you.
        </p>
        <p>
          Thank you for choosing HD Web Tools. We hope our utilities help you be more productive and successful in your projects. If you have any feedback or suggestions, please don't hesitate to reach out!
        </p>
      </CardContent>
    </Card>
  );
}
