---
title: "How We Cut a 48-Hour Quoting Process to 60 Seconds"
slug: how-we-cut-quoting-to-60-seconds
excerpt: "A technical case study on building Create3DParts — from manual email quoting losing leads to real-time STL parsing with instant Stripe checkout."
date: "2025-11-15"
author: "Tweak & Build"
tags:
  - Engineering
  - Case Studies
featuredImage: null
published: true
---

## The Problem Nobody Wants to Talk About

Here's a scenario most manufacturing founders know too well: a customer uploads a CAD file, sends an email, and waits. And waits. Forty-eight hours later — if they haven't already gone to a competitor — they get a quote back. Maybe.

That was the reality at Create3DParts before we got involved. Their 3D printing operation was growing, but their quoting process was stuck in 2010. Every quote required a human to open the file, eyeball the geometry, estimate material usage, calculate print time, and type up a reply.

The result? They were losing roughly 60% of leads who never came back after the initial inquiry. The ones who did convert were frustrated. And the team was spending 20+ hours per week on quoting alone — time they could have spent on actually running the business.

## Why This Wasn't a "Simple Fix"

The obvious answer is "just automate it." But 3D printing quoting isn't like quoting a t-shirt. You're dealing with complex 3D geometry, different materials with different costs per gram, varying infill densities, support structure requirements, and machine time calculations.

Most off-the-shelf quoting tools we evaluated fell into two camps:

- **Too simple**: Flat per-gram pricing that ignored geometry complexity, support material, and print orientation
- **Too complex**: Enterprise solutions with six-figure price tags and six-month implementation timelines

Neither fit a growing small business that needed something production-ready in weeks, not months.

## The Technical Approach

We broke the problem into four pieces:

### 1. Real-Time STL Parsing

When a customer uploads an STL file, we needed to extract usable data instantly — not queue it for manual review. We built a parsing pipeline that extracts volume, surface area, bounding box dimensions, and triangle count directly in the browser using Web Workers.

The key insight: you don't need to fully render the 3D model to quote it. You need the volume (for material cost), the bounding box (to check it fits the print bed), and the surface area (to estimate support material). Everything else is nice-to-have.

We process files client-side first for instant feedback, then validate server-side before finalizing the quote. This gives users a near-instant response while keeping our pricing accurate.

### 2. The Pricing Engine

Pricing a 3D print isn't just `volume × price_per_gram`. Our engine factors in:

- **Material cost**: Volume × material density × cost per kilogram
- **Machine time**: Estimated based on volume, layer height, and infill percentage
- **Support material**: Calculated from overhangs detected via surface normal analysis
- **Setup fee**: Flat cost per print job to cover bed preparation
- **Complexity multiplier**: Triangle count above a threshold adds a small premium for dense geometry

We stored all the pricing parameters in a configuration table so the Create3DParts team can adjust rates without touching code. Material costs change. Machine rates change. The system handles it.

### 3. Instant Checkout with Stripe

Once the customer has a price, we needed zero friction between "that looks right" and "take my money." We integrated Stripe Checkout with pre-built pricing based on the calculated quote.

The flow: upload file → see price → select material → click "Order Now" → Stripe Checkout → confirmation email with order tracking. The entire flow takes under 60 seconds.

We also built order tracking with automated email confirmations at each stage: order received, printing started, quality check passed, shipped.

### 4. File Storage and Management

Uploaded CAD files go to AWS S3 with signed URLs. The Create3DParts team gets a simple dashboard showing all orders, file downloads, and order status management. Nothing fancy — just what they need to run the operation.

## Why Next.js + Node.js

We get asked about stack decisions a lot, so here's the reasoning:

**Next.js** for the frontend because the quoting tool is essentially a multi-step form with real-time feedback. Server-side rendering for the marketing pages, client-side interactivity for the upload and quoting flow. One framework handling both, deployed to Vercel with zero DevOps overhead.

**Node.js** for the pricing engine because the STL parsing libraries we needed were JavaScript-based. Keeping everything in one language meant one deployment pipeline, one set of dependencies, and one team that could debug anything.

**Stripe** because it's Stripe. The Checkout integration took less than a day. Payment disputes, refunds, invoicing — all handled.

**AWS S3** for file storage because CAD files can be large (50MB+), and S3 handles that without us thinking about it. Signed URLs mean files are secure without building a separate auth layer for downloads.

## The Results

The numbers after 30 days told the story:

- **Quote time**: 48 hours → under 60 seconds
- **Completed orders**: Up 35% in month one
- **Manual quoting hours**: 20+ hours/week → essentially zero
- **Customer complaints about wait times**: Gone

But the number that mattered most to the founder was this: the leads that used to disappear during the 48-hour wait were now converting on the spot. The instant quote removed the biggest objection — uncertainty about price — and turned browsers into buyers.

## What We'd Do Differently

If we built this again, we'd invest more upfront in the support material estimation. Our current algorithm handles 90% of geometries well, but unusual overhangs sometimes produce estimates that are off by 10-15%. It's accurate enough for quoting, but there's room for improvement.

We'd also consider adding a 3D preview directly in the browser using Three.js. We skipped it for v1 because it wasn't necessary for quoting, but customer feedback suggests people want to see their part rendered before ordering. It's on the roadmap.

## The Takeaway

The lesson from Create3DParts isn't about 3D printing. It's about this: if your business depends on a manual process that makes customers wait, you're losing money every day you don't fix it.

The technology to automate quoting, booking, ordering, or any customer-facing workflow exists today. The question is whether you build it with a tool that fits your business or force your business to fit a tool that doesn't.

We chose to build exactly what was needed — nothing more, nothing less. That's the approach we take with every project at Tweak & Build.
