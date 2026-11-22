---
layout: default
permalink: /contagion/
title: "Contagion: one stock falls, its neighbours follow"
tag: "DEVELOPING"
date_story: "27 Feb 2020"
breaking: "RQ2: do shocks spread inside a sector more than between sectors?"
---

<p class="lead">On 16 March, almost everything fell at once. That is not contagion, that is the market. To find real chains of reactions, we have to remove the market first.</p>

## Step 1: remove the market

We estimate how much each stock normally moves with the market in a calm year. What is left after removing that part is the residual: the move the market does not explain. A shock is a residual below -3 standard deviations of the stock's own volatility, on a day when the market as a whole did not crash.

## What the filter removes

In Covid, 6,506 stocks and ETFs produce 12,788 raw shocks. Excluding market-wide down days removes 8,923 of them (70%), and leaves 3,865. Of these, 2,551 come from stocks and can be used for the stock-to-stock analysis.

| Sector | Raw shocks removed by the market filter |
|---|---|
| Real Estate | 87% |
| Materials | 80% |
| Utilities | 77% |
| Financials | 74% |
| ETFs | 68% |
| Industrials | 60% |
| Health Care | 53% |
| Information Technology | 49% |

<p class="callout">Counting raw shocks as contagion would have been wrong: most of them happened on days when the whole market fell. Small sectors keep few shocks (41 in Materials, 43 in Utilities), so we pool them into cyclical and defensive groups.</p>

## Step 2: follow the chain reactions

After each shock, we look at the abnormal returns and volumes of the other stocks over the following days, then compare the same sector with other sectors. Significant lead-lag links become a directed network, where the most influential stocks stand out (out-degree, PageRank).

<p class="todo">Cumulative abnormal return after a shock: same sector versus other sectors, with confidence bands.</p>

{% include figure.html todo="Directed network of significant lead-lag links (top stocks by dollar volume per sector), nodes coloured by sector and sized by PageRank. Export from networkx / Plotly." caption="The contagion network" %}

<p class="callout">We read every link as a lead-lag association, never as proof that one stock caused another to fall. Prices alone cannot establish causality.</p>
