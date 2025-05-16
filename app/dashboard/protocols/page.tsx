import { ProtocolAllocation } from "@/components/corporate/protocols/protocol-allocation";

export default function ProtocolsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Protocol Allocations</h1>
      <ProtocolAllocation />
    </div>
  );
}