---
layout: post
categories: News
title: M.Sc. thesis accepted
excerpt_separator: <!--more-->
comments: true
---
I'm very happy to announce that my M.Sc. thesis has been been accepted by the review committee, and is now officially [available online](http://www.dynamica.phy.ulaval.ca/fileadmin/theses/young14_master.pdf)
While the thesis is mostly written in French, you will find two English chapters, namely a chapter on cascading detection (see [this arXiv paper](http://arxiv.org/abs/1211.1364)), and a chapter that contains preliminary results taken from a paper that I'm currently writing with [L. Hébert-Dufresne](https://sites.google.com/site/laurenthebertdufresne/home) (now a James S. McDonnell Postdoctoral Fellow at the Santa Fe Institute). In that chapter, we propose that the _internal_ structure of communities arises from the juxtaposition of two simple stochastic processes.
[**September 22nd, 2016 update**: A much improved version of the paper now appears in [Phys. Rev. E.](http://dx.doi.org/10.1103/physreve.94.022317)]
<!--more-->
My thesis investigates the **mesoscopic structure** of complex networks, a structure that is crucial to the modeling of the dynamical processes _on_ and _of_ networks.

Unfortunately, a knowledge of this structure comes at great cost, since finding a optimal decomposition in communities is a problem that belongs to the NP hard complexity class.
Multiple recent algorithms yield approximate solutions in polynomial time (a [Google Scholar search](http://scholar.google.ca/scholar?hl=fr&q=community+detection&btnG=&lr=) yields approximately 2 950 000 results at the time of writing these lines!).
Most of these algorithms are collections of ad hoc methods, such that only extensive numerical studies lead to insightful comparisons.

In the thesis, I present the basis of a unified theory of community detection, which builds upon recent advances of the spectral theory of complex networks.
First, I prove that a large class of detection algorithm is equivalent to an optimization problem that can be solved approximately though the spectral decomposition of a very general cost matrix.
Within this framework, otherwise ad hoc algorithms can be studied analytically and rigorously.
This point of view also leads to a an first-principled spectral _detection_ algorithm based on the work of [M.A Riolo and M.E.J. Newman](http://arxiv.org/abs/1209.5969).
Second, using random matrix theory, I generalize existing results and prove that the spectrum of a class of modular networks contains valuable information on their mesoscopic structure.

These complementary approaches, spectral optimization and random matrix theory, give powerful insights into the spectral theory of complex networks, and their relevance to community structure.
These analytical results are, however, not yet generalizable to arbitrary networks.
Hence, for complex cases, a purely numerical approach is adopted.
This leads to the introduction of a heuristic method that drastically improves the efficiency of existing, imperfect algorithms (this is the so-called Cascading Detection approach).
To test this method, I introduce a local growth process that produces realistic modular networks with known community structure: The objective will be to use these networks [as benchmarks](http://www.spa-networks.org/).
