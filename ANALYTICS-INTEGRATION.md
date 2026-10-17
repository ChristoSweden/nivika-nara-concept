# Disabled analytics preparation

Tracking remains disabled by literal false gates, unknown/denied consent, and an unset reviewed provider script path. No Vercel service or Speed Insights was activated. The local bootstrap is mounted from index.html. The shared policy limits routes and drops sensitive URLs, query strings and fragments; consent withdrawal, DNT and GPC block new sends.

This draft branch has Vercel automatic deployment disabled by exact branch name in vercel.json. The commit uses [skip ci]; no merge or release is requested. Existing production configuration, headers and routes remain intact.

Before any separately authorized activation, integrate the real user privacy controls, verify current costs and allowance, review the provider endpoint and full request payload, then verify production collection against the dashboard/API. Source presence is not collection proof.

No business funnel events are wired by this patch; no demo action is represented as signup, checkout or delivery.

Local validation is recorded in the draft PR description. Full browser and production collection remain NOT_TESTED because activation is outside this change.
