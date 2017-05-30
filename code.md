---
layout: page
title: Code
---

Most of my code is directly available on [github](https://github.com/jg-you/), either on my personal page or on the pages of my collaborator.
What follows is a non-exhaustive list of the most useful software I developed over the past few years.

<div class="end-of-post"></div>

### MCMC sampling of the Simplicial Configuration Model (SCM)

<div class="code-links">
<a href="https://github.com/jg-you/scm/"><i class="fa fa-github fa-2x"
aria-hidden="true"></i> github</a><br/>
</div>

The Simplicial Configuration Model is random null model for simplicial complexes, mathematical objects which can be seen as 
high-order generalizations of simple graphs (they incorporate multi-node interactions). This C++ program (and 
library) is the reference implementation for the Markov chain Monte Carlo (MCMC) sampler discussed in [this 
paper](https://arxiv.org/abs/1705.10298).


<div class="end-of-post"></div>

### MCMC sampling of the Stochastic Block Model (SBM)

<div class="code-links">
<a href="https://github.com/jg-you/sbm_canonical_mcmc/"><i class="fa fa-github fa-2x" 
aria-hidden="true"></i> github</a><br/>
</div>

Basic sampling tool for the canonical SBM. Implements the Metropolis Hasting algorithm, both for sampling from the 
posterior distribution of the model, and maximizing its likelihood (through simulated annealing).
The algorithm is not as efficient as Belief Propagation, but it works on dense graphs.
See the Supplemental Material of [this paper](https://arxiv.org/abs/1701.00062) for more information.

<div class="end-of-post"></div>

### Structural Preferential Attachment (SPA+)

<div class="code-links">
<a href="https://github.com/spa-networks/spa/"><i class="fa fa-github fa-2x" aria-hidden="true"></i> github</a><br/>
<a href="http://dx.doi.org/10.5281/zenodo.47775"><img src="https://zenodo.org/badge/doi/10.5281/zenodo.47775.svg" alt="10.5281/zenodo.47775"></a>
</div>


SPA+ is stochastic growth process that produces realistic networks with a modular structure.
The first version of the model was introduced by [L. Hébert-Dufresne](http://laurenthebertdufresne.github.io/) _et al._ in a series of [two](http://arxiv.org/abs/1105.5980) [papers](http://arxiv.org/abs/1109.0034),back in 2011-2012.
While this initial version, dubbed SPA, reproduced most mesoscopic properties of real networks accurately, it made strong assumptions about the _structure of the communities_ of a network: Namely that real communities are formed by fully connected cliques of nodes (a hypothesis reminiscent of the work of [Palla et al](http://arxiv.org/abs/physics.soc-ph/0506133) [2005], for instance).
This strong hypothesis can of course be relaxed, but not in a straightforward and natural way.
This observation prompted the development of an extended model (SPA+) that accounts for the heterogeneous nature of community density in real networks.
See the associated  [publication](http://dx.doi.org/10.1103/PhysRevE.94.022317) for more information.
The repository contains a fast and robust C++ implementation of both the simple model (SPA) and the extended model (SPA+).


<div class="end-of-post"></div>
          
### Hierarchical Preferential Attachment (HPA)
<div class="code-links">
<a href="https://github.com/spa-networks/hpa/"><i class="fa fa-github fa-2x" aria-hidden="true"></i> github</a><br/>
<a href="http://dx.doi.org/10.5281/zenodo.47369"><img src="https://zenodo.org/badge/doi/10.5281/zenodo.47369.svg" alt="10.5281/zenodo.47369"></a>
</div>
The Hierarchical Preferential Attachment model (HPA) is a direct extension of SPA, and contains the latter as a special case. 
It is described in length in our [Physical Review E](http://dx.doi.org/10.1103/PhysRevE.92.062809) paper.
The hyper-linked repository _does not_ contain a full implementation of the model (yet?), but provides useful analytical tools to play around with the mean-field equations.

<div class="end-of-post"></div>
          
### cascading_detection

<div class="code-links">
<a href="https://github.com/jg-you/cascading_detection"><i class="fa fa-github fa-2x" aria-hidden="true"></i> github</a><br/>
<a href="http://dx.doi.org/10.5281/zenodo.31510" ><img src="https://zenodo.org/badge/doi/10.5281/zenodo.31510.svg" alt="10.5281/zenodo.31510"></a>
</div>

This repository contains a python implementation of the [cascading detection algorithm](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0140133).
It is a thin wrapper around other existing community detection algorithms.
It keeps track of nodes' identity through multiple pass of these algorithms, and produces extensive logs containing: time spent on each pass, edge list and clusters detected at each pass, etc.
The wrapper handles [CFinder](http://www.cfinder.org/) (Palla et al.), [link clustering](https://github.com/bagrow/linkcomm) (Ahn et al.) and [GCE](https://sites.google.com/site/greedycliqueexpansion/) (Lee at al.), i.e. all the algorithms that are analyzed the article.

<div class="end-of-post"></div>
          
### gists
<div class="code-links">
<a href="https://gist.github.com/jg-you"><i class="fa fa-github fa-2x" aria-hidden="true"></i> github</a>
</div>
I wrote _a lot_ of small and self-contained examples to teach myself new languages and features.
The most successful outcomes of these experiments are gathered in on _github gist_.
This includes C/C++ interface for `hdf5`, `boost::MPI`, and python snippets for multiple modules, such as `networkx`,  `numpy`, `PIL`.
      
<div class="end-of-post"></div>
          
### cli-stats
<div class="code-links">
<a href="https://github.com/jg-you/cli-stats"><i class="fa fa-github fa-2x" aria-hidden="true"></i> github</a>
</div>
_cli-stats_ is a (small) bundle of small and fast `c++` applications that replace some `R` command line calls. 
