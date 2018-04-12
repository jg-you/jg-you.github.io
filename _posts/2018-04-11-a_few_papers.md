---
layout: post
categories: Publications
title: A few additions to the publication page
excerpt_separator: <!--more-->
comments: true
---

Two papers on which I appear as a co-author have recently been published in **Physical Review E**! 

First, a deep cut by Guillaume St-Onge: [The paper](https://doi.org/10.1103/PhysRevE.97.022305) tackles SIS dynamics on time-varying networks with fixed degree sequences. By changing the relative time-scale of the epidemics and of the network's evolution, we are able to effectively interpolate between quenched and annealed formalisms of SIS dynamics on networks, thereby unifying *many* theoretical frameworks in one. My favourite result comes towards the end of the paper, where we show that the endemic phase can be *heterogeneous* near its onset: If you look at high degree nodes, then you'll find that the disease's prevalence scales faster with the network's size than if you had inspected low degree nodes.

Second, a fun [numerical paper](https://doi.org/10.1103/PhysRevE.97.032302) with [Edward Laurence](http://edwardlaurence.me/), [Sergey  Melnik](https://sites.google.com/site/svmelnik/) and [Louis J. Dubé](https://www.dynamica.phy.ulaval.ca/index.php?id=contact), where we show how to *exactly* solve cascade dynamics on small networks. By exact, I mean that we show how to calculate the probability of every single outcome, with arbitrary precision. Our algorithm is of course of exponential complexity, because there are exponentially many outcome in the first place; but there's a few trick involved in reaching such a "simple" algorithm. [Exact algorithms](https://arxiv.org/abs/1802.08849) are on the rise again!

I should also mention that I have recently uploaded a preprint [to the arXiv](https://arxiv.org/abs/1803.09191). This joint work with the extended [Dynamica](https://www.dynamica.phy.ulaval.ca/) family grew out of a  workshop held in 2016.
Our goal was to infer the  past states of a network given its current structure. The paper characterizes the problem thoroughly, from the point of view of statistical inference. I'll present this work at [NetSci 2018](https://www.netsci2018.com/) during the first parallel session. Comments are more than welcome!
