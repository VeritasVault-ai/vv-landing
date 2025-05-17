import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowUpRight, Star, TrendingUp, Shield, Zap } from "lucide-react";

/**
 * Strategy Marketplace Component
 * Browse, search and discover investment strategies
 */
export function StrategyMarketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Mock strategies data
  const strategies = [
    {
      id: 'strat-001',
      name: 'Momentum Alpha',
      description: 'Captures momentum across major crypto assets',
      category: 'momentum',
      performance: {
        monthly: 4.2,
        yearly: 32.5,
        risk: 'Medium'
      },
      creator: 'Quantum Research',
      verified: true,
      popularity: 985,
      tags: ['Momentum', 'Large Cap', 'Trending']
    },
    {
      id: 'strat-002',
      name: 'DeFi Yield Optimizer',
      description: 'Maximizes yield opportunities across DeFi protocols',
      category: 'yield',
      performance: {
        monthly: 2.8,
        yearly: 24.7,
        risk: 'Low-Medium'
      },
      creator: 'DeFi Labs',
      verified: true,
      popularity: 1243,
      tags: ['Yield', 'DeFi', 'Income']
    },
    {
      id: 'strat-003',
      name: 'Layer-1 Rotator',
      description: 'Rotates between high-performance L1 blockchains',
      category: 'sector',
      performance: {
        monthly: 5.1,
        yearly: 47.2,
        risk: 'High'
      },
      creator: 'Blockchain Ventures',
      verified: false,
      popularity: 657,
      tags: ['L1', 'Rotation', 'Growth']
    },
    {
      id: 'strat-004',
      name: 'Volatility Harvester',
      description: 'Profits from market volatility using derivatives',
      category: 'volatility',
      performance: {
        monthly: 3.5,
        yearly: 29.8,
        risk: 'Medium-High'
      },
      creator: 'Alpha Quant',
      verified: true,
      popularity: 432,
      tags: ['Volatility', 'Options', 'Hedging']
    },
    {
      id: 'strat-005',
      name: 'Blue Chip Portfolio',
      description: 'Conservative allocation to established crypto assets',
      category: 'conservative',
      performance: {
        monthly: 1.9,
        yearly: 18.3,
        risk: 'Low'
      },
      creator: 'Steady Returns',
      verified: true,
      popularity: 1876,
      tags: ['Blue Chip', 'Conservative', 'Stable']
    },
    {
      id: 'strat-006',
      name: 'NFT Market Cycle',
      description: 'Targets opportunities in the NFT ecosystem',
      category: 'sector',
      performance: {
        monthly: 6.7,
        yearly: 58.4,
        risk: 'Very High'
      },
      creator: 'NFT Capital',
      verified: false,
      popularity: 289,
      tags: ['NFT', 'Metaverse', 'Gaming']
    }
  ];
  
  // Filter strategies based on search and category
  const filteredStrategies = strategies.filter(strategy => {
    const matchesSearch = searchQuery === '' || 
      strategy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      strategy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      strategy.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = activeCategory === 'all' || strategy.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Strategy Marketplace</h2>
        <div className="relative w-full sm:w-64 lg:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search strategies..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" onValueChange={setActiveCategory}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Strategies</TabsTrigger>
          <TabsTrigger value="momentum">Momentum</TabsTrigger>
          <TabsTrigger value="yield">Yield</TabsTrigger>
          <TabsTrigger value="sector">Sector</TabsTrigger>
          <TabsTrigger value="volatility">Volatility</TabsTrigger>
          <TabsTrigger value="conservative">Conservative</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStrategies.map((strategy) => (
              <StrategyCard key={strategy.id} strategy={strategy} />
            ))}
          </div>
          
          {filteredStrategies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No strategies found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => {setSearchQuery(''); setActiveCategory('all');}}>
                Clear filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        {['momentum', 'yield', 'sector', 'volatility', 'conservative'].map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStrategies.map((strategy) => (
                <StrategyCard key={strategy.id} strategy={strategy} />
              ))}
            </div>
            
            {filteredStrategies.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No strategies found in this category.</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

// Strategy Card Component
function StrategyCard({ strategy }: { strategy: any }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{strategy.name}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <span>{strategy.creator}</span>
              {strategy.verified && (
                <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 hover:bg-blue-50">Verified</Badge>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Star className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{strategy.description}</p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-muted p-2 rounded-md text-center">
            <p className="text-xs text-muted-foreground">Monthly</p>
            <p className={`text-sm font-medium ${strategy.performance.monthly > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {strategy.performance.monthly > 0 ? '+' : ''}{strategy.performance.monthly}%
            </p>
          </div>
          <div className="bg-muted p-2 rounded-md text-center">
            <p className="text-xs text-muted-foreground">Yearly</p>
            <p className={`text-sm font-medium ${strategy.performance.yearly > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {strategy.performance.yearly > 0 ? '+' : ''}{strategy.performance.yearly}%
            </p>
          </div>
          <div className="bg-muted p-2 rounded-md text-center">
            <p className="text-xs text-muted-foreground">Risk</p>
            <p className="text-sm font-medium">{strategy.performance.risk}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {strategy.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>{strategy.popularity} users</span>
          </div>
          <Button size="sm">
            View Details <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}