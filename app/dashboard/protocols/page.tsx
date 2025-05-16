import { ProtocolAllocation } from "@/components/corporate/protocols/protocol-allocation";

/**
 * Renders the Protocol Allocations page with a heading and the protocol allocation component.
 *
 * Displays a styled container featuring a title and the {@link ProtocolAllocation} component.
 */
export default function ProtocolsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Protocol Allocations</h1>
      <ProtocolAllocation />
    </div>
  );
}