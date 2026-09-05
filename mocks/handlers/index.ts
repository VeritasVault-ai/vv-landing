import { allocationHandlers } from './allocation-handlers';
import { historicalDataHandlers } from './historical-data-handlers';
import { protocolHandlers } from './protocol-handlers';
// Import other handler groups as needed

// Export all handlers
export const handlers = [
  ...protocolHandlers,
  ...allocationHandlers,
  ...historicalDataHandlers,
  // Add other handler groups as needed
];
