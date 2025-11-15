import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lightbulb, TrendingUp, Zap } from "lucide-react";

const Index = () => {
  const [businessContext, setBusinessContext] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [industry, setIndustry] = useState("");
  const [problem, setProblem] = useState("");
  const [recommendation, setRecommendation] = useState<{
    strategic: string;
    bpa: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const generateRecommendation = () => {
    setLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      setRecommendation({
        strategic: `Expand into predictive analytics for demand forecasting. Enable clients to anticipate stock needs 30-60 days ahead using AI-powered trend analysis. This differentiates Synkron from basic sync tools and justifies premium pricing while reducing client stockouts by 40%.`,
        bpa: `Automate customer onboarding with intelligent integration wizards. Implement: 1) Auto-detect marketplace APIs and pre-configure sync rules, 2) Self-service setup workflows with guided steps, 3) Automated health checks post-integration. Expected impact: 70% reduction in setup time, 50% decrease in support tickets.`
      });
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (problem.trim() && companySize.trim() && industry.trim()) {
      generateRecommendation();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent to-background">
      {/* Hero Section */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <TrendingUp className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Synkrone.in</h1>
              <p className="text-sm text-muted-foreground">Strategic Consulting & BPA for SMEs</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground">
            Transform Your Business Challenges Into Opportunities
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Get expert strategic consulting and business process automation recommendations tailored for your SME. 
            Actionable insights in seconds.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          {/* Input Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Describe Your Business Challenge
              </CardTitle>
              <CardDescription>
                Provide context about your business and the specific problem you're facing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., Retail, Manufacturing, Healthcare"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Input
                    id="companySize"
                    placeholder="e.g., 10-50 employees"
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="context">Business Context (Optional)</Label>
                  <Textarea
                    id="context"
                    placeholder="Brief overview of your current operations..."
                    value={businessContext}
                    onChange={(e) => setBusinessContext(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="problem">Primary Challenge</Label>
                  <Textarea
                    id="problem"
                    placeholder="Describe the specific business problem or challenge you're facing..."
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={loading || !problem.trim() || !companySize.trim() || !industry.trim()}
                >
                  {loading ? "Analyzing..." : "Get Expert Recommendations"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results Display */}
          <div className="space-y-6">
            {recommendation ? (
              <>
                <Card className="border-primary/20 bg-primary/5 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <TrendingUp className="h-5 w-5" />
                      Strategic Recommendation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-foreground">
                      {recommendation.strategic}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 bg-primary/5 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <Zap className="h-5 w-5" />
                      BPA Opportunity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-foreground">
                      {recommendation.bpa}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">
                      <strong>Next Steps:</strong> Schedule a detailed consultation to develop an implementation roadmap. 
                      These recommendations are starting points for deeper strategic discussions tailored to your unique business needs.
                    </p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-dashed shadow-lg">
                <CardContent className="flex min-h-[400px] items-center justify-center p-12">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Lightbulb className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-foreground">
                      Ready to Transform Your Business?
                    </h3>
                    <p className="text-muted-foreground">
                      Fill out the form to receive personalized strategic and automation recommendations
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Strategic Consulting</h3>
              <p className="text-sm text-muted-foreground">
                Actionable strategies tailored to your business context and growth objectives
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Process Automation</h3>
              <p className="text-sm text-muted-foreground">
                Identify high-impact automation opportunities to boost efficiency and reduce costs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">SME-Focused</h3>
              <p className="text-sm text-muted-foreground">
                Recommendations designed specifically for small and medium-sized enterprises
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="mt-16 border-t bg-card/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Synkrone.in. Professional consulting for growing businesses.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
