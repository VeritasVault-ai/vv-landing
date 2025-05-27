# Wallet Connection and Transaction Tracking

This implementation adds comprehensive tracking for wallet connections and transactions, with integration to the Plurality system. It includes:

1. **Event Tracking**
   - Wallet connection attempts, successes, and failures
   - Transaction initiation, signing, submission, confirmation, and failures
   - Plurality session creation, authentication, and transactions

2. **Analytics Dashboards**
   - Wallet connection success rates dashboard
   - Plurality integration metrics dashboard
   - Integration with the main analytics dashboard

3. **Tracking Services**
   - `wallet-connection-tracker.ts` - Tracks wallet connection events
   - `transaction-tracker.ts` - Tracks transaction lifecycle events

## Usage Examples

### Tracking Wallet Connections

```typescript
import { useWalletConnectionTracker } from '@/lib/services/wallet-connection-tracker'
import { WalletType } from '@/lib/analytics/wallet-analytics'

function ConnectWalletButton() {
  const { 
    initiateConnection, 
    handleConnectionSuccess, 
    handleConnectionFailure,
    connectionState
  } = useWalletConnectionTracker()

  const connectWallet = async () => {
    // Start tracking the connection attempt
    const startTime = initiateConnection(WalletType.METAMASK, {
      sessionId: 'plurality-session-id', // Optional Plurality data
      userId: 'plurality-user-id'        // Optional Plurality data
    })

    try {
      // Actual wallet connection logic here
      const { address, chainId } = await connectToMetaMask()
      
      // Track successful connection
      handleConnectionSuccess(address, chainId, startTime, {
        sessionId: 'plurality-session-id', // Optional Plurality data
        userId: 'plurality-user-id'        // Optional Plurality data
      })
    } catch (error) {
      // Track failed connection
      handleConnectionFailure(
        error.message, 
        error.code, 
        startTime, 
        {
          sessionId: 'plurality-session-id', // Optional Plurality data
        }
      )
    }
  }

  return (
    <button 
      onClick={connectWallet}
      disabled={connectionState.status === 'connecting'}
    >
      {connectionState.status === 'connecting' ? 'Connecting...' : 'Connect Wallet'}
    </button>
  )
}
```

### Tracking Transactions

```typescript
import { useTransactionTracker } from '@/lib/services/transaction-tracker'
import { WalletType } from '@/lib/analytics/wallet-analytics'

function SendTransactionButton() {
  const { initiateTransaction } = useTransactionTracker()

  const sendTransaction = async () => {
    // Start tracking the transaction
    const { 
      transactionState, 
      signed, 
      failed 
    } = initiateTransaction(
      'deposit',                // Transaction type
      WalletType.METAMASK,      // Wallet type
      '0x123...abc',            // User address
      1,                        // Chain ID
      '1.5',                    // Amount (optional)
      'ETH',                    // Asset (optional)
      {                         // Plurality data (optional)
        sessionId: 'plurality-session-id',
        userId: 'plurality-user-id'
      }
    )

    try {
      // Request signature from user
      const signedTx = await requestSignature()
      
      // Track signed transaction
      const { transactionState: signedState, submitted, failed: signFailed } = signed()
      
      try {
        // Submit transaction to blockchain
        const { hash } = await submitTransaction(signedTx)
        
        // Track submitted transaction
        const { 
          transactionState: submittedState, 
          confirmed, 
          failed: submitFailed 
        } = submitted(hash)
        
        // Wait for confirmation
        const receipt = await waitForConfirmation(hash)
        
        // Track confirmed transaction
        const finalState = confirmed(
          receipt.gasUsed.toString(),
          receipt.effectiveGasPrice.toString()
        )
        
        console.log('Transaction confirmed:', finalState)
      } catch (submitError) {
        // Track submission failure
        const failedState = submitFailed(submitError.message, submitError.code)
        console.error('Transaction submission failed:', failedState)
      }
    } catch (signError) {
      // Track signing failure
      const failedState = failed(signError.message, signError.code)
      console.error('Transaction signing failed:', failedState)
    }
  }

  return (
    <button onClick={sendTransaction}>
      Send Transaction
    </button>
  )
}
```

## Dashboard Access

The wallet connection and Plurality dashboards are accessible through the main analytics dashboard under the "Wallet Connections" and "Plurality" tabs.

