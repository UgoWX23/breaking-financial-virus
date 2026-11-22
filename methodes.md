---
layout: default
permalink: /methodes/
title: "Behind the scenes of the investigation"
tag: "METHODS"
date_story: "Notebook"
---

Everything is computed in the results notebook of the repository. The site only displays results.

## Data

- **Kaggle stock market dataset**: 8,049 files (5,884 stocks and 2,165 ETFs), one CSV per ticker, ending on 1 April 2020.
- **Yahoo Finance**: price history extended to 30 October 2026, with dividends, for 5,277 tickers.
- **Sector labels**: built from Yahoo Finance and mapped to the 11 GICS-style sectors, plus cyclical and defensive groups. They are not official GICS labels.
- **Regional ETFs**: 26 funds mapped by hand to a region.
- **Crisis windows**: fixed before looking at results, from public lists and NBER dates.

## Cleaning

Some Kaggle `Adj Close` values are wrong on 7,201 days (0.026% of returns). When the `Close` and `Adj Close` returns differ by more than 5 points, we keep the one closest to zero. Files with a zero or negative `Adj Close` (33) are excluded.

## Method in short

1. **Market model.** Per stock, a regression on the market over a calm reference year gives the residual and a standardised residual.
2. **Part I.** Drawdown, volatility ratio, range, volume and illiquidity per stock; onset dates; PCA with leave-one-crisis-out.
3. **Part II.** Shocks below -3 standard deviations on non-crash days; cumulative abnormal returns; lagged cross-correlations; Granger-type tests with Benjamini-Hochberg correction; directed network analysed with out-degree and PageRank.
4. **Part III.** Sector indices and lead-lag; k-means and hierarchical clustering compared with sectors; regional ETFs in calm versus crisis, aligned with the epidemic timeline.

## Limits

- **Survivorship bias.** Only securities listed in 2020 are present. Covid is almost complete, earlier crises are not.
- **Association, not causation.** All lead-lag results are associations.
- **Labels.** 28% of Covid stocks have no sector.
- **Frozen data.** Yahoo revises history, so results depend on the download of 1-2 November 2026.
