// Types for historical data
export interface HistoricalDataPoint {
  date: string;
  value: number;
  return: number;
  drawdown: number;
}

export const STRATEGY_PROFILES = {
  // Conservative strategy - low volatility, steady growth
  conservative: {
    volatility: 0.8,
    trend: 0.05,
    maxDrawdown: -5
  },
  // Balanced strategy - medium volatility, moderate growth
  balanced: {
    volatility: 1.5,
    trend: 0.08,
    maxDrawdown: -12
  },
  // Aggressive strategy - high volatility, high growth potential
  aggressive: {
    volatility: 2.5,
    trend: 0.12,
    maxDrawdown: -25
  },
  // Market neutral - very low volatility, low returns
  marketNeutral: {
    volatility: 0.3,
    trend: 0.02,
    maxDrawdown: -2
  },
  // Momentum strategy - high volatility with strong trend following
  momentum: {
    volatility: 2.2,
    trend: 0.15,
    maxDrawdown: -20
  }
};

// Mock historical data for different timeframes
export const MOCK_HISTORICAL_DATA: Record<string, HistoricalDataPoint[]> = {
  '1d': generateMockTimeseriesData(24, '1d'),
  '1w': generateMockTimeseriesData(7, '1w'),
  '1m': generateMockTimeseriesData(30, '1m'),
  '3m': generateMockTimeseriesData(90, '3m'),
  '6m': generateMockTimeseriesData(180, '6m'),
  '1y': generateMockTimeseriesData(365, '1y')
};

/**
 * Generate mock time series data for a specific timeframe
 */
function generateMockTimeseriesData(
  dataPoints: number,
  timeframe: string,
  profile = STRATEGY_PROFILES.balanced
): HistoricalDataPoint[] {
  const { volatility, trend, maxDrawdown } = profile;
  const data: HistoricalDataPoint[] = [];
  
  let value = 100; // Start value
  let peak = value;
  
  // Adjust volatility based on timeframe
  const timeframeVolatilityFactor = 
    timeframe === '1d' ? 0.2 :
    timeframe === '1w' ? 0.5 :
    timeframe === '1m' ? 0.8 : 1;
  
  const adjustedVolatility = volatility * timeframeVolatilityFactor;
  
  // Calculate the base interval in milliseconds
  const baseInterval = 
    timeframe === '1d' ? (24 / dataPoints) * 60 * 60 * 1000 :  // Hours for 1d
    timeframe === '1w' ? 24 * 60 * 60 * 1000 :                 // Days for 1w
    24 * 60 * 60 * 1000;                                       // Days for other periods
  
  // Get current date/time
  const now = new Date();
  
  for (let i = 0; i < dataPoints; i++) {
    // Create a new date object for this data point
    const date = new Date();
    
    // Calculate time offset: start from (dataPoints) intervals ago, then add (i) intervals
    // This creates evenly spaced intervals counting forward from the start date
    const timeOffset = (dataPoints - i - 1) * baseInterval;
    date.setTime(now.getTime() - timeOffset);
    
    // Calculate daily change with randomness and trend
    const dailyChange = ((Math.random() - 0.5) * adjustedVolatility) + (trend / dataPoints);
    value = value * (1 + dailyChange);
    
    // Update peak value
    if (value > peak) {
      peak = value;
    }
    
    // Calculate drawdown from peak
    const drawdown = ((value / peak) - 1) * 100;
    
    // Ensure drawdown doesn't exceed max drawdown
    if (drawdown < maxDrawdown) {
      value = peak * (1 + maxDrawdown / 100);
    }
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: parseFloat(value.toFixed(2)),
      return: parseFloat((dailyChange * 100).toFixed(2)),
      drawdown: parseFloat(Math.min(0, drawdown).toFixed(2))
    });
  }
  
  return data;
}

/**
 * Get mock historical data for a specific strategy and timeframe
 */
export function getMockHistoricalDataForStrategy(
  strategyId: string,
  timeframe: string = '1y'
): HistoricalDataPoint[] {
  // Determine which profile to use based on strategy ID
  const profileKey = getProfileKeyForStrategy(strategyId);
  const profile = STRATEGY_PROFILES[profileKey];
  
  // Use existing data if available, otherwise generate new data
  if (MOCK_HISTORICAL_DATA[timeframe]) {
    // Clone the data to avoid modifying the original
    const baseData = [...MOCK_HISTORICAL_DATA[timeframe]];
    
    // Adjust the data based on the strategy profile
    return baseData.map(point => {
      const profileFactor = (profile.trend / STRATEGY_PROFILES.balanced.trend);
      return {
        ...point,
        value: parseFloat((point.value * profileFactor).toFixed(2)),
        return: parseFloat((point.return * profileFactor).toFixed(2)),
        drawdown: parseFloat((point.drawdown * (profile.maxDrawdown / STRATEGY_PROFILES.balanced.maxDrawdown)).toFixed(2))
      };
    });
  }
  
  // Generate new data if we don't have pre-generated data for this timeframe
  const days = timeframeToDataPoints(timeframe);
  return generateMockTimeseriesData(days, timeframe, profile);
}

/**
 * Map strategy ID to a profile key
 */
function getProfileKeyForStrategy(strategyId: string): keyof typeof STRATEGY_PROFILES {
  // Extract a number from the strategy ID to determine the profile
  const num = parseInt(strategyId.replace(/\D/g, '')) || 0;
  const profileKeys = Object.keys(STRATEGY_PROFILES) as Array<keyof typeof STRATEGY_PROFILES>;
  return profileKeys[num % profileKeys.length];
}

/**
 * Convert timeframe string to number of data points
 */
function timeframeToDataPoints(timeframe: string): number {
  switch (timeframe) {
    case '1d': return 24;
    case '1w': return 7;
    case '1m': return 30;
    case '3m': return 90;
    case '6m': return 180;
    case '1y': return 365;
    case 'all': return 730;
    default: return 30;
  }
}