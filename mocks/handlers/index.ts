import { allocationHandlers } from './allocation-handlers';
import { historicalDataHandlers } from './historical-data-handlers';
import { protocolHandlers } from './protocol-handlers';
import { votingHandlers } from './voting-handlers';
// Import other handler groups as needed

// Export all handlers
export const handlers = [
  ...votingHandlers,
  ...protocolHandlers,
  ...allocationHandlers,
  ...historicalDataHandlers,
  // Add other handler groups as needed
];
