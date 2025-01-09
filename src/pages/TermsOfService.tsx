import { Card } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Card className="max-w-4xl mx-auto p-6 md:p-8 space-y-6">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p>By accessing and using Daily Planner, you agree to these Terms of Service and our Privacy Policy.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. User Accounts</h2>
          <p>You are responsible for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintaining account security</li>
            <li>All activities under your account</li>
            <li>Providing accurate information</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Service Usage</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use the service for illegal purposes</li>
            <li>Attempt to gain unauthorized access</li>
            <li>Interfere with service operation</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Contact</h2>
          <p>For terms-related questions, please contact us at terms@lumenads.in</p>
        </section>
      </Card>
    </div>
  );
}