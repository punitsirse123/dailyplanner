import { Card } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Card className="max-w-4xl mx-auto p-6 md:p-8 space-y-6">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
          <p>When you use Daily Planner, we collect:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Information you provide (email, profile data)</li>
            <li>Usage data (tasks, notes, preferences)</li>
            <li>Authentication data through Google sign-in</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and maintain the service</li>
            <li>Improve user experience</li>
            <li>Send service-related notifications</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Data Storage and Security</h2>
          <p>Your data is stored securely using Supabase's infrastructure. We implement industry-standard security measures to protect your information.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Contact Us</h2>
          <p>For privacy-related questions, please contact us at privacy@lumenads.in</p>
        </section>
      </Card>
    </div>
  );
}