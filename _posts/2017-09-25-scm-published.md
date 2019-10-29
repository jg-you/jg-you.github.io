---
layout: post
categories: Publications
title: The shape of randomness
excerpt_separator: <!--more-->
comments: true
---


I'm happy to announce that the results of a fun project with [Alice Patania](http://apatania.altervista.org/), [Giovanni Petri](https://lordgrilo.github.io/) and Francesco Vaccarino are now available in a short paper in [Physical Review E](https://doi.org/10.1103/PhysRevE.96.032312).
Special thanks to the [YRNCS](http://yrncs.cssociety.org/), who funded this collaboration through their [Bridge Grant initiative](http://yrncs.cssociety.org/bridge-grants/).

Our paper, titled "*Construction of and efficient sampling from the simplicial configuration model*," builds on [recent work](https://arxiv.org/abs/1602.04110) by Owen T. Courtney and Ginestra Bianconi.
More specifically, we propose an efficient and provably correct MCMC algorithm for the maximally random ensemble of  [simplicial complexes](https://en.wikipedia.org/wiki/Simplicial_complex) with given degree and dimension sequences.
This algorithm comes in handy when we use simplicial complexes as an abstraction for the structure of complex systems (as has been done [more and more often recently](https://link.springer.com/article/10.1140/epjds/s13688-017-0104-x)).
By randomizing a simplicial complex that encodes the structure of some system *X*, we get to tell what connection patterns in *X* are explained by simple local properties (degrees and dimensions), and what patterns are surprising. 
In our paper, we this method to show that the [homology groups](https://en.wikipedia.org/wiki/Homology_(mathematics)) of a few real-world systems are decidedly not random, and we suggest some mechanisms that could explain these differences.
But one could use the method to investigate different properties.

<!--more-->

**Added on November 18th, 2017:** [Kendra Redmond](https://www.facebook.com/KRStories/) wrote [a nice blog post](http://physicsbuzz.physicscentral.com/2017/10/the-shape-of-randomness.html) about our paper, over at the APS's Physics Central. Check it out!
