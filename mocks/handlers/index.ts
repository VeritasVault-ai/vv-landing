import { votingHandlers } from './voting-handlers';
import { protocolHandlers } from './protocol-handlers';
// Import other handler groups as needed

// Export all handlers
export const handlers = [
  ...votingHandlers,
  ...protocolHandlers,
  // Add other handler groups as needed
];
