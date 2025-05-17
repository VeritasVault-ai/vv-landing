import { corporate } from './dashboards/main/corporate';
import { consumer } from './dashboards/main/consumer';
import { tezosLiquidity } from './dashboards/main/tezosLiquidity';
import { market } from './dashboards/main/market';

import { analytics } from './dashboards/analytics/analytics';
import { performance } from './dashboards/analytics/performance';
import { onchain } from './dashboards/analytics/onchain';
import { offchain } from './dashboards/analytics/offchain';
import { aiAnalytics } from './dashboards/analytics/aiAnalytics';

import { treasury } from './dashboards/portfolio/treasury';
import { portfolio } from './dashboards/portfolio/portfolio';
import { watchlist } from './dashboards/portfolio/watchlist';
import { modelPortfolio } from './dashboards/portfolio/modelPortfolio';

import { admin } from './dashboards/admin/admin';
import { events } from './dashboards/admin/events';
import { voting } from './dashboards/admin/voting';

import { strategies } from './dashboards/tools/strategies';
import { riskAssessment } from './dashboards/tools/riskAssessment';
import { flashLoans } from './dashboards/tools/flashLoans';

export const allDashboards = [
  // main
  corporate,
  consumer,
  tezosLiquidity,
  market,
  
  // analytics
  analytics,
  performance,
  onchain,
  offchain,
  aiAnalytics,
  
  // portfolio
  treasury,
  portfolio,
  watchlist,
  modelPortfolio,
  
  // admin
  admin,
  events,
  voting,
  
  // tools
  strategies,
  riskAssessment,
  flashLoans,
] as const;