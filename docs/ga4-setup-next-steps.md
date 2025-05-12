# GA4 Setup – Next Steps

This document outlines the remaining implementation steps now that the high-priority custom dimensions have been identified and categorized.

---

## ✅ Immediate Actions (Today–Tomorrow)

1. **Register High Priority Custom Dimensions**

   - Go to **Admin → Custom definitions → Create custom dimension**
   - Add the 10 dimensions from the "🟢 High Priority" group
   - Use the correct parameter names and scopes

2. **Update Event Tracking Code**

   - Ensure that event parameters use the renamed keys (e.g., `login_method_success`, not `method`)
   - Push updates to frontend codebase

3. **Validate Event Firing**

   - Use GA4's **DebugView** and **Realtime** tabs to verify that:
     - Events are firing correctly
     - Parameters are being captured
     - No duplication or parameter collisions exist

---

## 🛠️ Short-Term (This Week)

1. **Review and Possibly Register Medium Priority Dimensions**

   - Reassess which dimensions from the "🟡 Medium Priority" list will add immediate insight

2. **Audit and Rename Any Legacy Event Parameters**

   - Check for any usage of `method`, `source`, etc. across the GA4 property or codebase
   - Rename and refactor accordingly to prevent name collisions

3. **Start Creating Conversions**

   - Mark important events like:
     - `create_strategy`
     - `execute_strategy`
     - `add_liquidity`
     - `register`
   - Go to **Admin → Events → Mark as conversion**

---

## 📅 Mid-Term (1–2 Weeks)

1. **Build Audience Segments**

   - Example: Users with `strategy_type = automated` and `risk_level = aggressive`

2. **Link GA4 with Google Ads or Search Console** (if applicable)

3. **Create Explorations and Reports Using Dimensions**

   - **Custom Reports**: Create reusable reports in the GA4 Reports Library using high-priority dimensions like `strategy_type`, `feature_name`, or `search_term`.
   - **Funnel Explorations**: Draft multi-step funnels such as:
     - Login → Create Strategy → Execute Strategy
     - Register → Add Liquidity → Claim Rewards
   - **Segmentation Comparisons**: Use Explorations to compare performance between user segments such as:
     - `risk_level = aggressive` vs `risk_level = conservative`
     - Users navigating to `tab_destination = liquidity`
     - Users using `feature_name = auto_strategy`

---

## 📘 Advanced Configuration (Phase 4)

1. **Set Up User Properties**
   - Go to **Configure → Custom definitions → User properties → Create**
   - Add properties:
     - `user_risk_profile` (conservative, moderate, aggressive)
     - `preferred_investment_type` (liquidity pools, staking, etc.)
     - `account_tier` (basic, premium, enterprise)

2. **Implement Consent Mode** (if applicable for GDPR)
   - Configure consent mode in your tag setup
   - Define default and update consent states

3. **Set Up Custom Events**
   - Define your event taxonomy:
     - Authentication: `login`, `register`, `password_reset`
     - Strategy: `create_strategy`, `save_strategy`, `execute_strategy`
     - Liquidity: `add_liquidity`, `remove_liquidity`, `adjust_position`
   - Implement in code via `gtag('event', ...)`
   - Example:
     \`\`\`javascript
     gtag('event', 'create_strategy', {
       'strategy_type': 'automated',
       'risk_level': 'moderate',
       'assets_included': 3
     });
     \`\`\`
   - Register necessary custom dimensions as needed (already covered above)

4. **Set Up Conversions**
   - Go to **Admin → Events**, toggle key events as conversions:
     - `register`
     - `create_strategy`
     - `execute_strategy`
     - `add_liquidity`
   - Add custom conversions under **Admin → Conversions → New conversion event**

5. **Create Audiences**
   - Go to **Configure → Audiences → New audience**
   - Create segments like:
     - "Active Traders": executed multiple strategies
     - "High-Value Users": large liquidity positions
     - "At-Risk Users": abandoned strategy creation

6. **Configure Funnel Reports**
   - Go to **Explore → Funnel exploration**
   - Example funnels:
     - Login Flow: view login → login attempt → login success → view dashboard
     - Strategy Flow: view strategies → create → configure → save

7. **Link Google Products**
   - Google Ads: **Admin → Product links → Google Ads linking**
   - Search Console: **Admin → Product links → Search Console linking**

---

## 📊 Reporting and Monitoring (Phase 5)

1. **Set Up Custom Reports and Dashboards**
   - Create dashboards for:
     - User acquisition
     - Engagement (active users, session duration)
     - Conversions (strategy creation/execution rate)
     - Retention (returning users)
   - Go to **Reports → Library → Create** for custom reports

2. **Configure Alerts and Anomaly Detection**
   - Go to **Admin → Custom definitions → Calculated metrics** for conversion rate, etc.
   - Set up alerts under **Configure → Alerts**:
     - Drop in registrations
     - Spike in login failures
     - Drop in strategy completions

---

## 🧠 Later Phase (Optional / Low Priority)

1. **Register Low Priority Dimensions if Needed**
2. **Enable anomaly detection and alerts**
3. **Document entire GA4 configuration for audit/readability**

---

Let me know when to export this checklist or embed it into a shared GA4 playbook.
