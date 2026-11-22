---
layout: default
permalink: /sectors/
title: "The sectors fall one after the other"
tag: "ANALYSIS"
date_story: "2 Mar 2020"
breaking: "RQ3: how do sectors react relative to each other?"
---

<p class="lead">Zooming out from single stocks, sectors do not fall together. Some drop first, some drop hardest, and some barely move. We measure how fast, how wide and how deep the shock goes.</p>

## Four ways to read the spread

- **Speed**: how many days after the origin sector does each sector join?
- **Breadth**: what share of its stocks is hit?
- **Intensity**: how deep is the median drawdown?
- **Attenuation**: how fast does the sector recover?

{% include figure.html todo="Heatmap of median worst drawdown by sector (cell greyed out under 20 stocks), from graph.plot_sector_heatmap." caption="Which sectors were hit hardest?" %}

{% include figure.html todo="Animated sector map: each sector changes colour on its onset date, in order of lead-lag. Plotly animation." caption="The crash, sector by sector" %}

## Cyclical or defensive?

In Covid, we have 2,544 cyclical and 758 defensive stocks, enough to compare the two groups. The expectation is that defensive sectors fall later and less, which we test rather than assume.

<p class="todo">Result: onset, drawdown and recovery of cyclical versus defensive groups.</p>

## Do our sectors match the data?

Finally, we let the data group stocks by how they behaved in the crash (k-means and hierarchical clustering on the crisis features), and compare the clusters with the 11 sector labels using the adjusted Rand index and normalised mutual information.

<p class="todo">Result: do the data-driven clusters recover the sectors, or do crisis behaviours cut across them?</p>

<p class="callout">About 28% of Covid stocks have no sector label (Unclassified). They stay in market-level results and are left out of sector-level claims.</p>
