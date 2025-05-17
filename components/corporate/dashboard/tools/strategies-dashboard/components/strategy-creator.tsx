import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ChevronRight, AlertCircle, Check } from "lucide-react";

/**
 * Strategy Creator Component
 * Allows users to create and customize investment strategies
 */
export function StrategyCreator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [strategyName, setStrategyName] = useState('');
  const [riskLevel, setRiskLevel] = useState(5);
  const [horizon, setHorizon] = useState('medium');
  const [objective, setObjective] = useState('growth');
  const [constraints, setConstraints] = useState({
    maxDrawdown: 20,
    minLiquidity: 500000,
    excludeStablecoins: false,
    excludeTokenized: false,
    maxPoolAllocation: 25,
    rebalanceFrequency: 'monthly'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };
  
  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setCurrentStep(1);
        setStrategyName('');
        setRiskLevel(5);
        setHorizon('medium');
        setObjective('growth');
        setConstraints({
          maxDrawdown: 20,
          minLiquidity: 500000,
          excludeStablecoins: false,
          excludeTokenized: false,
          maxPoolAllocation: 25,
          rebalanceFrequency: 'monthly'
        });
      }, 3000);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      {isSuccess ? (
        <Card className="border-green-500">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-600">Strategy Created Successfully!</h3>
              <p className="mt-2 text-muted-foreground">
                Your new strategy "{strategyName}" has been created and is now being initialized.
              </p>
              <Button className="mt-6" onClick={() => setIsSuccess(false)}>
                Create Another Strategy
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Create New Strategy</CardTitle>
              <CardDescription>Define a custom investment strategy based on your objectives and constraints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                    1
                  </div>
                  <div className={`h-0.5 w-12 ${currentStep >= 2 ? 'bg-primary' : 'bg-secondary'}`} />
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                    2
                  </div>
                  <div className={`h-0.5 w-12 ${currentStep >= 3 ? 'bg-primary' : 'bg-secondary'}`} />
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                    3
                  </div>
                  <div className={`h-0.5 w-12 ${currentStep >= 4 ? 'bg-primary' : 'bg-secondary'}`} />
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 4 ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                    4
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Step {currentStep} of 4
                </div>
              </div>
              
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Basic Information</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="strategy-name">Strategy Name</Label>
                      <Input 
                        id="strategy-name" 
                        placeholder="Enter a name for your strategy" 
                        value={strategyName}
                        onChange={(e) => setStrategyName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Risk Tolerance</Label>
                      <div className="pt-2">
                        <Slider 
                          value={[riskLevel]} 
                          min={1}
                          max={10}
                          step={1}
                          onValueChange={(values) => setRiskLevel(values[0])}
                          className="w-full"
                        />
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                          <span>Conservative</span>
                          <span>Moderate</span>
                          <span>Aggressive</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="investment-horizon">Investment Horizon</Label>
                      <Select value={horizon} onValueChange={setHorizon}>
                        <SelectTrigger id="investment-horizon">
                          <SelectValue placeholder="Select time horizon" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Short-term (less than 1 year)</SelectItem>
                          <SelectItem value="medium">Medium-term (1-3 years)</SelectItem>
                          <SelectItem value="long">Long-term (3+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="investment-objective">Investment Objective</Label>
                      <Select value={objective} onValueChange={setObjective}>
                        <SelectTrigger id="investment-objective">
                          <SelectValue placeholder="Select objective" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income">Income Generation</SelectItem>
                          <SelectItem value="growth">Capital Growth</SelectItem>
                          <SelectItem value="preservation">Capital Preservation</SelectItem>
                          <SelectItem value="speculation">Speculation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Investment Constraints</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Maximum Drawdown Tolerance (%)</Label>
                      <div className="pt-2">
                        <Slider 
                          value={[constraints.maxDrawdown]} 
                          min={5}
                          max={50}
                          step={5}
                          onValueChange={(values) => setConstraints({...constraints, maxDrawdown: values[0]})}
                          className="w-full"
                        />
                        <div className="flex justify-between mt-2 text-xs">
                          <span>{constraints.maxDrawdown}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Minimum Liquidity ($)</Label>
                      <div className="pt-2">
                        <Slider 
                          value={[constraints.minLiquidity / 100000]} 
                          min={1}
                          max={20}
                          step={1}
                          onValueChange={(values) => setConstraints({...constraints, minLiquidity: values[0] * 100000})}
                          className="w-full"
                        />
                        <div className="flex justify-between mt-2 text-xs">
                          <span>${(constraints.minLiquidity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Maximum Allocation per Pool (%)</Label>
                      <div className="pt-2">
                        <Slider 
                          value={[constraints.maxPoolAllocation]} 
                          min={5}
                          max={50}
                          step={5}
                          onValueChange={(values) => setConstraints({...constraints, maxPoolAllocation: values[0]})}
                          className="w-full"
                        />
                        <div className="flex justify-between mt-2 text-xs">
                          <span>{constraints.maxPoolAllocation}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="exclude-stablecoins">Exclude Stablecoins</Label>
                        <p className="text-xs text-muted-foreground">Remove stablecoins from investment universe</p>
                      </div>
                      <Switch 
                        id="exclude-stablecoins" 
                        checked={constraints.excludeStablecoins}
                        onCheckedChange={(checked) => setConstraints({...constraints, excludeStablecoins: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="exclude-tokenized">Exclude Tokenized Assets</Label>
                        <p className="text-xs text-muted-foreground">Remove tokenized traditional assets</p>
                      </div>
                      <Switch 
                        id="exclude-tokenized" 
                        checked={constraints.excludeTokenized}
                        onCheckedChange={(checked) => setConstraints({...constraints, excludeTokenized: checked})}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Rebalancing Settings</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="rebalance-frequency">Rebalancing Frequency</Label>
                      <Select 
                        value={constraints.rebalanceFrequency} 
                        onValueChange={(value) => setConstraints({...constraints, rebalanceFrequency: value})}
                      >
                        <SelectTrigger id="rebalance-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-secondary/50">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium">Rebalancing Information</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Frequent rebalancing may incur higher transaction costs but keeps your strategy more closely aligned with targets.
                            Less frequent rebalancing reduces costs but may allow larger deviations from target allocations.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Recommended Strategy Template</h4>
                      <Tabs defaultValue="balanced">
                        <TabsList className="grid grid-cols-3 w-full">
                          <TabsTrigger value="conservative">Conservative</TabsTrigger>
                          <TabsTrigger value="balanced">Balanced</TabsTrigger>
                          <TabsTrigger value="aggressive">Aggressive</TabsTrigger>
                        </TabsList>
                        <TabsContent value="conservative" className="p-4 border rounded-lg mt-2">
                          <p className="text-sm">Lower risk profile with focus on capital preservation.</p>
                          <ul className="mt-2 text-xs text-muted-foreground space-y-1">
                            <li>• 60% Large-cap assets</li>
                            <li>• 20% Mid-cap assets</li>
                            <li>• 10% Yield-generating assets</li>
                            <li>• 10% Stablecoins</li>
                          </ul>
                        </TabsContent>
                        <TabsContent value="balanced" className="p-4 border rounded-lg mt-2">
                          <p className="text-sm">Moderate risk profile with balanced growth and stability.</p>
                          <ul className="mt-2 text-xs text-muted-foreground space-y-1">
                            <li>• 40% Large-cap assets</li>
                            <li>• 30% Mid-cap assets</li>
                            <li>• 20% Small-cap assets</li>
                            <li>• 10% Yield-generating assets</li>
                          </ul>
                        </TabsContent>
                        <TabsContent value="aggressive" className="p-4 border rounded-lg mt-2">
                          <p className="text-sm">Higher risk profile focused on maximum growth potential.</p>
                          <ul className="mt-2 text-xs text-muted-foreground space-y-1">
                            <li>• 20% Large-cap assets</li>
                            <li>• 30% Mid-cap assets</li>
                            <li>• 40% Small-cap assets</li>
                            <li>• 10% Early-stage assets</li>
                          </ul>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Review & Confirm</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg space-y-4">
                      <div>
                        <h4 className="text-sm font-medium">Basic Information</h4>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Strategy Name</p>
                            <p className="text-sm">{strategyName || 'Untitled Strategy'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Risk Level</p>
                            <p className="text-sm">{riskLevel}/10</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Investment Horizon</p>
                            <p className="text-sm capitalize">{horizon}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Objective</p>
                            <p className="text-sm capitalize">{objective.replace('-', ' ')}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium">Constraints & Parameters</h4>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Max Drawdown</p>
                            <p className="text-sm">{constraints.maxDrawdown}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Min Liquidity</p>
                            <p className="text-sm">${constraints.minLiquidity.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Max Pool Allocation</p>
                            <p className="text-sm">{constraints.maxPoolAllocation}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Rebalancing</p>
                            <p className="text-sm capitalize">{constraints.rebalanceFrequency}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Exclude Stablecoins</p>
                            <p className="text-sm">{constraints.excludeStablecoins ? 'Yes' : 'No'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Exclude Tokenized Assets</p>
                            <p className="text-sm">{constraints.excludeTokenized ? 'Yes' : 'No'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-secondary/50">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium">Strategy Simulation</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Based on your settings, our backtest simulation shows an estimated annual return of 14.2% with a volatility of 18.7%.
                            The maximum historical drawdown would have been 22.3%.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < 4 ? (
                  <Button onClick={handleNext}>
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create Strategy'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}