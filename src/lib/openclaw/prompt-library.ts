export interface PromptEntry {
  id: string;
  category: "outreach" | "objection" | "phone" | "qualification" | "voicemail";
  title: string;
  description: string;
  body: string;
}

export const PROMPT_LIBRARY: PromptEntry[] = [
  {
    id: "cold-email-v1",
    category: "outreach",
    title: "Cold email — opening reference",
    description: "Manual variant of the auto-generated initial email. Use when sending one-off.",
    body: `Hey {{firstName}},

Quick one — pulled up {{businessName}}'s site this morning and noticed {{specificIssue}}. On {{industry}} sites in {{city}}, that usually translates to {{businessImpact}}.

I run a small studio (Tweak & Build) that rebuilds these for local businesses. We hit 90+ Lighthouse, ship in 3-6 weeks, and price between $4.5k and $18k depending on scope.

Worth a free 10-minute teardown? I'll record a Loom walking through the 3 things I'd fix first.

— Ian
P.S. Reply STOP and I won't email again.`,
  },
  {
    id: "followup-1",
    category: "outreach",
    title: "Follow-up #1 (3 days, no reply)",
    description: "Short bump referencing a second specific finding.",
    body: `Hey {{firstName}} — bumping this once. Also noticed {{secondIssue}}. Same offer: free 10-min teardown, no pitch deck.

If timing is off, totally fine to say no.

— Ian
P.S. Reply STOP and I won't email again.`,
  },
  {
    id: "followup-2-breakup",
    category: "outreach",
    title: "Follow-up #2 (breakup)",
    description: "Graceful close. Permission to silence.",
    body: `Hey {{firstName}} — assuming the timing isn't right. Going to stop bothering you. If anything changes, the offer stays open.

— Ian
P.S. Reply STOP and I won't email again.`,
  },
  {
    id: "obj-too-expensive",
    category: "objection",
    title: 'Objection: "Too expensive"',
    description: "Reframe price as ROI per lead.",
    body: `Totally fair. Quick math: if a new lead is worth ~\${LTV} to you, the rebuild pays for itself after {{N}} extra leads. We typically see lift inside 60 days post-launch from speed + lead form changes alone.

Want me to send a one-pager with the lift we saw on a similar {{industry}} site?`,
  },
  {
    id: "obj-have-someone",
    category: "objection",
    title: 'Objection: "We already have someone"',
    description: "Open door without burning bridge.",
    body: `Got it — happy you're covered. Two questions and I'll get out of your way:
1. Are they handling SEO/GEO + monthly speed updates, or just the build?
2. If you ever want a second-set-of-eyes audit (free, no obligation), I can put one together in 24 hours.`,
  },
  {
    id: "obj-no-time",
    category: "objection",
    title: 'Objection: "No bandwidth right now"',
    description: "Defer without dropping.",
    body: `Makes sense. Want me to follow up in {{N}} weeks? I'll set a reminder. In the meantime here's a quick win that takes 10 minutes: {{quickWin}}.`,
  },
  {
    id: "phone-discovery",
    category: "phone",
    title: "Discovery call — opening 90 seconds",
    description: "Use on the first call. Goal: get them talking about their pain.",
    body: `Hey {{firstName}}, Ian from Tweak & Build. Thanks for jumping on.

To make this useful: I've got 25 minutes blocked. My plan is to spend 5 understanding what's actually broken right now, 10 walking through what I'd change on your site, and the last 10 on cost + timeline if it's a fit. Sound good?

[wait for yes]

Cool — so tell me what made you say "yes, let's talk" when my email came in. What's the most expensive thing your current site is costing you right now?`,
  },
  {
    id: "phone-close",
    category: "phone",
    title: "Soft close — end of discovery call",
    description: "Move them to a written quote without pressure.",
    body: `Based on what you've shared, this is in scope for a {{Tweak|Build}} engagement. Here's what I'd do:

1. Send a written 1-pager today with: scope, timeline, fixed price.
2. If it lines up, we kick off Monday. If not, no hard feelings.

What's the best email for the quote?`,
  },
  {
    id: "voicemail-1",
    category: "voicemail",
    title: "Voicemail #1 (initial)",
    description: "Under 20 seconds. Specific. Mention you'll send an email.",
    body: `Hey {{firstName}}, Ian Baker with Tweak & Build. Looked at your site this morning, noticed {{specificIssue}} — wanted to share what we'd fix. I'll send a quick email with details. {{callbackNumber}}. Thanks.`,
  },
  {
    id: "qual-fast",
    category: "qualification",
    title: "Quick qualification — 4 questions",
    description: "Send these in reply to a warm lead before the call.",
    body: `Awesome — to make our call useful, mind answering these in a reply?

1. Roughly how many leads/month does your current site generate?
2. What's your target — 2x, 5x, more?
3. Timeline urgency — launch in 4 weeks, 8 weeks, or "whenever"?
4. Budget range — under $10k, $10-20k, or open?

No wrong answers. Just helps me show up prepared.`,
  },
];

export const CATEGORY_LABELS: Record<PromptEntry["category"], string> = {
  outreach: "Outreach",
  objection: "Objection",
  phone: "Phone",
  qualification: "Qualification",
  voicemail: "Voicemail",
};
