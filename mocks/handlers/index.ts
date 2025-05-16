import { votingHandlers } from './voting-handlers';
import { protocolHandlers } from './protocol-handlers';
import { allocationHandlers } from './allocation-handlers';
// Import other handler groups as needed

// Export all handlers
export const handlers = [
  ...votingHandlers,
  ...protocolHandlers,
  ...allocationHandlers,
  // Add other handler groups as needed
];
