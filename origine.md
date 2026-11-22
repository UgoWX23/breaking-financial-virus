---
layout: default
permalink: /origine/
title: "Patient zero: where did the crash start?"
tag: "EXCLUSIVE ANALYSIS"
date_story: "24 Feb 2020"
breaking: "RQ1: how did the crash hit stocks, and which ones fell first?"
---

<p class="lead">Before following the crash from stock to stock, we need to describe it. How deep did stocks fall, how fast, and which kind of stock was hit first?</p>

## What we measure

For each stock we compare its behaviour during the crash with its own calm period, a reference year that ends 21 trading days before the peak. The main features are the maximum drawdown, the jump in volatility, the intraday range, the overnight gap, abnormal volume and illiquidity. Formulas are on the [methods page]({{ '/methodes/' | relative_url }}).

## First look (provisional)

<div class="stats">
  <div class="stat"><b>-42%</b><span>median worst drawdown of a stock</span></div>
  <div class="stat"><b>x4.3</b><span>typical jump in volatility</span></div>
  <div class="stat"><b>23 days</b><span>to reach the bottom</span></div>
</div>
<p class="callout">These numbers come from an early version of the analysis and will change. Treat them as a placeholder until the final run.</p>

{% include figure.html todo="Median drawdown path of all stocks over the first 23 days, with the middle-half band (graph.plot_drawdown_paths). Export from the notebook as Plotly HTML." caption="How quickly did stocks fall?" %}

{% include figure.html todo="Share of stocks at least 20% below their peak, each day (graph.plot_selloff_breadth)." caption="How widespread was the sell-off?" %}

## Where does it start?

We date the onset of each stock as the first day its market-adjusted return or volume moves far outside its own pre-crisis range. The earliest sectors and stocks are our patient zero.

<p class="todo">Result of the onset analysis: which sector joins first, how many days before the market-wide fall, and which feature (volume, range, return) moves first.</p>

{% include figure.html todo="Map or ranking of sectors by median onset date, with the number of stocks per sector." caption="Who fell first?" %}

## Do the findings hold in other crises?

We learn the features on two crises and test them on the third (leave-one-crisis-out). If the same features describe all three, we are describing crises in general, not only Covid.

<p class="todo">PCA loadings of the Covid features and their cosine similarity with the dot-com and 2008 loadings.</p>
