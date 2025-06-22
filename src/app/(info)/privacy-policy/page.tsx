import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the privacy policy for HD Web Tools to understand how we handle data and protect your privacy.',
};

export default function PrivacyPolicyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Policy</CardTitle>
        <CardDescription>Last Updated: {new Date().toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-muted-foreground">
        <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Introduction</h3>
            <p>
                Welcome to HD Web Tools. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website. Please note that this is a template and should be reviewed by a legal professional.
            </p>
        </div>
        <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Data Collection and Use</h3>
            <p>
                Most of our tools operate entirely on the client-side, meaning the data you input is processed in your browser and is never sent to our servers. For tools that require it (e.g., Online Notepad, Clipboard History), we may use your browser's local storage to save your data. This data remains on your computer and is not accessible by us.
            </p>
             <p>
                For our AI-powered tools like the Text Variation Generator, the text you provide is sent to a third-party AI service (such as Google's Gemini) for processing. We do not store this text, but you should review the privacy policy of the respective AI provider.
            </p>
        </div>
         <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Advertising</h3>
            <p>
                This website may use Google AdSense to display ads. Google uses cookies to serve ads based on a user's prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet. You may opt out of personalized advertising by visiting Ads Settings.
            </p>
        </div>
        <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Cookies</h3>
            <p>
                We use cookies only for essential site functionality and analytics to improve our services. We do not use them to track you for advertising purposes outside of the third-party services mentioned above.
            </p>
        </div>
        <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Changes to This Policy</h3>
            <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
