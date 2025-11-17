import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lightbulb, TrendingUp, Zap, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ThemeToggle } from "@/components/ThemeToggle";

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
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load n8n chat widget
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
      createChat({
        webhookUrl: 'https://dsm-n8n-642200156.kloudbeansite.com/webhook/3cdc60ec-1df3-4aa3-aca8-6dddea2ac534/chat'
      });
    `;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  const generateRecommendation = async () => {
    setLoading(true);
    setError(null);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    
    try {
      const response = await fetch('https://dsm-n8n-642200156.kloudbeansite.com/webhook/3cdc60ec-1df3-4aa3-aca8-6dddea2ac534/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          industry,
          companySize,
          businessContext,
          problem
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('server');
      }

      const data = await response.json();
      
      if (!data.strategic || !data.bpa) {
        throw new Error('invalid');
      }
      
      setRecommendation({
        strategic: data.strategic,
        bpa: data.bpa
      });
      setError(null);
    } catch (err: any) {
      clearTimeout(timeoutId);
      let errorMessage = "Unable to connect to the recommendation service. Please check your internet connection.";
      
      if (err.name === 'AbortError') {
        errorMessage = "Request timed out. The service might be busy. Please try again.";
      } else if (err.message === 'server') {
        errorMessage = "The recommendation service is temporarily unavailable. Please try again in a few moments.";
      } else if (err.message === 'invalid') {
        errorMessage = "Received incomplete recommendations. Please try submitting again.";
      }
      
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      console.error('Error generating recommendations:', err);
    } finally {
      setLoading(false);
    }
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Synkrone.in</h1>
                <p className="text-sm text-muted-foreground">Strategic Consulting & BPA for SMEs</p>
              </div>
            </div>
            <ThemeToggle />
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
            {loading ? (
              <>
                {/* Loading Skeleton */}
                <Card className="border-primary/20 bg-primary/5 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Skeleton className="h-5 w-5 rounded" />
                      <Skeleton className="h-6 w-48" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>

                <Card className="border-primary/20 bg-primary/5 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Skeleton className="h-5 w-5 rounded" />
                      <Skeleton className="h-6 w-48" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              </>
            ) : error ? (
              <Alert variant="destructive" className="shadow-lg">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Failed to Generate Recommendations</AlertTitle>
                <AlertDescription className="mt-2">
                  <p className="mb-4">{error}</p>
                  <Button 
                    onClick={generateRecommendation}
                    variant="outline"
                    size="sm"
                  >
                    Try Again
                  </Button>
                </AlertDescription>
              </Alert>
            ) : recommendation ? (
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
