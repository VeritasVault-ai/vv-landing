# GA4 Custom Dimensions (Categorized by Priority)

## 🟢 High Priority (Register Now)
These 10 dimensions provide the most immediate value for reporting, funnel optimization, and segmentation.

| Display Name              | Scope | Description                          | Event Parameter        |
| ------------------------- | ----- | ------------------------------------ | ---------------------- |
| Login Method Success      | Event | Login method during successful login | login_method_success   |
| Strategy Type             | Event | Type of strategy (e.g. automated)    | strategy_type          |
| Strategy Risk Level       | Event | Risk profile selected                | strategy_risk_level    |
| Strategy Target APY       | Event | Desired APY for strategy             | strategy_target_apy    |
| Pool Name (Add Liquidity) | Event | Name of the liquidity pool           | pool_name_add          |
| Add Liquidity Amount      | Event | Amount added to pool                 | liquidity_amount_add   |
| Rewards Amount            | Event | Amount of rewards claimed            | rewards_amount         |
| Search Term               | Event | User search query                    | search_term            |
| Feature Name              | Event | Name of feature used                 | feature_name           |
| Tab Destination           | Event | Tab navigated to                     | tab_destination        |

---

## 🟡 Medium Priority (Consider Soon)
Useful for segmentation and engagement analysis but not essential for MVP reporting.

| Display Name                  | Scope | Description                                 | Event Parameter            |
| ----------------------------- | ------|---------------------------------------------|----------------------------|
| Strategy Name (Save)          | Event | Name of strategy saved                      | strategy_name_save         |
| Strategy Name (Execution)     | Event | Name of strategy executed                   | strategy_name_execute      |
| Allocation Type               | Event | Type of fund allocation                     | allocation_type            |
| Strategy Amount               | Event | Value allocated in strategy                 | strategy_amount            |
| Strategy Currency             | Event | Currency used in strategy                   | strategy_currency          |
| Protocol (Add Liquidity)      | Event | Protocol used when adding liquidity         | pool_protocol_add          |
| Protocol (Claim Rewards)      | Event | Protocol used to claim rewards              | protocol_rewards           |
| Pool ID (Claim Rewards)       | Event | ID of pool rewards claimed from             | pool_id_rewards            |
| Feature Section               | Event | App section where feature used              | feature_section            |
| Tab Source                    | Event | Tab navigated from                          | tab_source                 |

---

## 🔵 Low Priority (Track in Code Only for Now)
Still useful, but unlikely to appear in reports unless explicitly needed for advanced workflows or debugging.

| Display Name                  | Scope | Description                                 | Event Parameter            |
| ----------------------------- | ------|---------------------------------------------|----------------------------|
| User ID (Login)               | Event | User ID captured on login                   | login_user_id              |
| Returning User Flag           | Event | Flag indicating if user returned            | is_returning_user          |
| Register Method Attempt       | Event | Method used during registration attempt     | register_method_attempt    |
| Register Method Success       | Event | Registration method during success          | register_method_success    |
| Register Source               | Event | Source of registration                      | register_source            |
| Password Reset Source         | Event | Source of password reset flow               | password_reset_source      |
| Strategy ID (Save)            | Event | Strategy ID used during save                | strategy_id_save           |
| Strategy ID (Execution)       | Event | Strategy ID used during execution           | strategy_id_execute        |
| Strategy ID (Adjustment)      | Event | Strategy ID used during risk adjustment     | strategy_id_adjustment     |
| Previous Risk Level           | Event | Risk level before adjustment                | strategy_previous_level    |
| New Risk Level                | Event | Risk level after adjustment                 | strategy_new_level         |
| New Strategy Flag             | Event | Whether the strategy is newly created       | strategy_is_new            |
| Pool ID (Add Liquidity)       | Event | Liquidity pool ID added to                  | pool_id_add                |
| Liquidity Currency Add        | Event | Currency used when adding liquidity         | liquidity_currency_add     |
| Pool ID (Remove Liquidity)    | Event | Liquidity pool ID removed from              | pool_id_remove             |
| Pool Name (Remove Liquidity)  | Event | Name of liquidity pool removed from         | pool_name_remove           |
| Protocol (Remove Liquidity)   | Event | Protocol used for removal                   | pool_protocol_remove       |
| Remove Liquidity Amount       | Event | Value removed from pool                     | liquidity_amount_remove    |
| Remove Liquidity Currency     | Event | Currency removed from liquidity pool        | liquidity_currency_remove  |
| Position Duration             | Event | Duration the position was held              | position_duration          |
| Pool ID (Adjust Position)     | Event | Liquidity pool ID for adjustment            | pool_id_adjust             |
| Adjustment Type               | Event | Type of adjustment made                     | position_adjustment_type   |
| Adjusted Amount               | Event | Amount changed in position                  | adjustment_amount          |
| Adjustment Currency           | Event | Currency of adjustment                      | adjustment_currency        |
| Modal Name (Open)             | Event | Name of modal opened                        | modal_name_open            |
| Modal Source (Open)           | Event | Source of modal trigger                     | modal_source_open          |
| Modal Name (Close)            | Event | Name of modal closed                        | modal_name_close           |
| Modal Duration (Close)        | Event | Time modal was visible                      | modal_duration_close       |
| Search Category               | Event | Category of the search                      | search_category            |
| Search Result Count           | Event | Number of search results returned           | search_result_count        |

> You can revisit the medium and low priority groups after your initial reporting needs are established. This prevents clutter and ensures your GA4 property remains efficient and focused.
