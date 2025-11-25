import { useState } from "react";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import { ArrowLeft, Moon, Sun, Monitor, Sparkles, Bell, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Settings</h1>
              <p className="text-sm text-muted-foreground">Customize your experience</p>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize how Synkrone.in looks on your device
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">Theme</Label>
                <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="flex items-center gap-3 cursor-pointer flex-1">
                      <Sun className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Light</div>
                        <div className="text-sm text-muted-foreground">Bright and clear interface</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="flex items-center gap-3 cursor-pointer flex-1">
                      <Moon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Dark</div>
                        <div className="text-sm text-muted-foreground">Easy on the eyes</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system" className="flex items-center gap-3 cursor-pointer flex-1">
                      <Monitor className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">System</div>
                        <div className="text-sm text-muted-foreground">Match your device settings</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="animations" className="text-base font-medium">Animations</Label>
                    <p className="text-sm text-muted-foreground">Enable smooth transitions and effects</p>
                  </div>
                </div>
                <Switch
                  id="animations"
                  checked={animationsEnabled}
                  onCheckedChange={setAnimationsEnabled}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Preferences
              </CardTitle>
              <CardDescription>
                Manage your application preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications" className="text-base font-medium">Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates about your recommendations</p>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex items-center gap-3">
                  <Database className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="autosave" className="text-base font-medium">Auto-save</Label>
                    <p className="text-sm text-muted-foreground">Automatically save your inputs</p>
                  </div>
                </div>
                <Switch
                  id="autosave"
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                />
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
              <CardDescription>
                Information about Synkrone.in
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-base font-medium">Version</Label>
                <p className="text-sm text-muted-foreground mt-1">1.0.0</p>
              </div>
              <Separator />
              <div>
                <Label className="text-base font-medium">Description</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Strategic Consulting & Business Process Automation for SMEs
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
