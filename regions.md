---
layout: default
permalink: /regions/
title: "The world in red: markets versus the epidemic"
tag: "WORLD"
date_story: "9 Mar 2020"
breaking: "RQ3: did the crash follow the path of the virus?"
---

<p class="lead">The virus travelled from Asia to Europe to the Americas. Did the financial crash follow the same route, at the same speed?</p>

## What we use

26 regional ETFs mapped by hand to a region. 25 of them can be used in Covid (SPY is the market benchmark and is left out of the table by construction). Each ETF tells us how its region's market reacted, in US trading hours.

## Two timelines, side by side

We date the onset of the crash in each region, then compare it with the date the epidemic became visible there.

<p class="todo">Choose and cite the epidemic data (for example case or death counts by country) and map countries to the same regions as the ETFs.</p>

{% include figure.html todo="Animated world map: each region turns red on its financial onset date, with a curve of the epidemic in that region underneath." caption="The crash and the virus, region by region" %}

## Calm versus crisis

We also compare correlations and lead-lag between regional ETFs in calm periods and in the crash. If regions move together more in the crisis, diversification fails exactly when it is needed.

<p class="todo">Result: correlation matrix of regional ETFs, calm versus crash, and the regions that lead.</p>

<p class="callout">US-listed ETFs trade on US hours, so a region's ETF can react the next morning to news from Asia or Europe. This timing effect must be kept in mind when we read lead and lag between regions.</p>
