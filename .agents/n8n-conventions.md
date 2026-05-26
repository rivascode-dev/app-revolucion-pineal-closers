# n8n Team Development Conventions (Lucem)

This document defines the mandatory standards for creating and managing n8n workflows. The goal is to ensure that any team member (or AI agent) can easily read, maintain, and execute nodes without syntax or naming issues.

## 1. Node Naming Conventions (Reference ID)
Node names must be technical, written in **English**, use **`snake_case`**, and start with a functional prefix. **Spaces or special characters (: / -) are strictly prohibited.**

| Prefix | Category | Description | Example |
| :--- | :--- | :--- | :--- |
| `trig_` | **Trigger** | Entry points (Schedule, Webhook, Form). | `trig_daily_8am` |
| `get_` | **Read** | Queries to APIs, Databases, or Sheets. | `get_stripe_data` |
| `post_` | **Write** | Record creation or sending messages. | `post_whatsapp_msg` |
| `calc_` | **Logic** | Data transformations (Code, Set, Edit). | `calc_date_params` |
| `flow_` | **Flow** | Execution control (Wait, If, Loop, Switch). | `flow_wait_7s` |
| `sub_` | **Subflow** | Sub-workflow execution. | `sub_clean_lead` |

## 2. Variable Naming (Internal Data)
Within Code nodes and in JSON output object keys, use descriptive **`camelCase`** in **English**.

- **Dates**: Use `Date` suffix for formatted strings.
  - ✅ `yesterdayDate`, `eventTimestamp`
  - ❌ `fecha_ayer`, `yesterday` (ambiguous)
- **Booleans**: Use state prefixes.
  - ✅ `isPaymentValid`, `hasEmail`
- **Metrics**: Be specific with the metric state.
  - ✅ `totalCalls`, `cancelByCloser`, `noShowCount`

## 3. Resilience and Best Practices
- **Anti-Spam**: Every message-sending node (WhatsApp/Email) must be preceded by a `flow_wait` of at least 5-7 seconds when placed inside a loop.
- **Secure References**: To reference data from other nodes, always use the secure node ID syntax:
  - ✅ `{{ $('get_stripe_data').item.json.amount }}`
- **Documentation**: If the internal logic of a node is complex, utilize the node's **"Description"** property or add an informative **"Sticky Note"** in the workflow canvas.

## 4. Guidelines for AI Agents (Gemini/Cursor)
When generating new workflows or modifying existing ones:
1. Always read this conventions file to strictly apply the `prefix_name` schema.
2. Prioritize using Luxon's `DateTime` for date and timezone handling.
3. Ensure all connections in the workflow JSON match the newly renamed node IDs.