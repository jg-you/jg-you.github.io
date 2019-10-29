---
layout: page
title: Code
---

## Code

A non-exhaustive list of some software I have developed over the past few years. See also my [github](https://github.com/jg-you/) page and the websites of my [collaborators](about.html#collaborators).

<div class="end-of-post"></div>

### plant-pollinator-inference

<div class="code-links">
<a href="https://github.com/jg-you/plant-pollinator-inference/"><i class="fa fa-github fa-2x"
aria-hidden="true"></i> github</a><br/>
</div>

`stan` model to infer the network structure that best explains  observational data of plant-pollinator interactions. Model described in [this preprint](https://www.biorxiv.org/content/10.1101/754077v1).

<div class="end-of-post"></div>
### network-archaeology

<div class="code-links">
<a href="https://github.com/jg-you/network-archaeology"><i class="fa fa-github fa-2x"
aria-hidden="true"></i> github</a><br/>
</div>

Sequential Monte-Carlo sampler for the distribution over past states of a statically observed network. The method is described in [this paper](https://arxiv.org/abs/1803.09191).
See also [this github page](https://github.com/gcant/temporal-recovery-tree-py) where [George Cantwell](https://www.george-cantwell.com) implements an *exact* solution in the special case of trees (method described in this [preprint](https://arxiv.org/abs/1910.04788)).



<div class="end-of-post"></div>

### MCMC sampling of the Simplicial Configuration Model (SCM)

<div class="code-links">
<a href="https://github.com/jg-you/scm/"><i class="fa fa-github fa-2x"
aria-hidden="true"></i> github</a><br/>
</div>

The Simplicial Configuration Model is a random null model for simplicial complexes, mathematical objects that can be seen as high-order generalizations of simple graphs (they incorporate multi-node interactions). This C++ program (and 
library) is the reference implementation for the Markov chain Monte Carlo (MCMC) sampler discussed in [this 
paper](https://arxiv.org/abs/1705.10298).


<div class="end-of-post"></div>

### MCMC sampling of the Stochastic Block Model (SBM)

<div class="code-links">
<a href="https://github.com/jg-you/sbm_canonical_mcmc/"><i class="fa fa-github fa-2x" 
aria-hidden="true"></i> github</a><br/>
</div>

Basic sampling tool for the canonical SBM. Implements the Metropolis Hasting algorithm, both for sampling from the posterior distribution of the model and for maximizing its likelihood (through simulated annealing). The algorithm is not as efficient as Belief Propagation, but it works on dense graphs. See the Supplemental Material of [this paper](https://arxiv.org/abs/1701.00062) for more information.

<div class="end-of-post"></div>

### Structural Preferential Attachment (SPA+)

<div class="code-links">
<a href="https://github.com/spa-networks/spa/"><i class="fa fa-github fa-2x" aria-hidden="true"></i> github</a><br/>
<a href="http://dx.doi.org/10.5281/zenodo.47775"><img src="https://zenodo.org/badge/doi/10.5281/zenodo.47775.svg" alt="10.5281/zenodo.47775"></a>
</div>

SPA is a stochastic growth process that generates realistic networks with a modular structure. The first version of the model, SPA, is described in  [two](http://arxiv.org/abs/1105.5980) [papers](http://arxiv.org/abs/1109.0034) by [L. Hébert-Dufresne](http://laurenthebertdufresne.github.io/) _et al._ , and the generalization implemented here is described in this [publication](http://dx.doi.org/10.1103/PhysRevE.94.022317). 

<div class="end-of-post"></div>
          
### Hierarchical Preferential Attachment (HPA)
<div class="code-links">
<a href="https://github.com/spa-networks/hpa/"><i class="fa fa-github fa-2x" aria-hidden="true"></i> github</a><br/>
<a href="http://dx.doi.org/10.5281/zenodo.47369"><img src="https://zenodo.org/badge/doi/10.5281/zenodo.47369.svg" alt="10.5281/zenodo.47369"></a>
</div>
The Hierarchical Preferential Attachment model (HPA) is a direct extension of SPA, and contains the latter as a special case. 
It is described in this [Physical Review E](http://dx.doi.org/10.1103/PhysRevE.92.062809) paper.
The repository _does not_ contain a full implementation of the model, but provides useful analytical tools to play around with the mean-field equations. 

<div class="end-of-post"></div>
          
### cascading_detection

<div class="code-links">
<a href="https://github.com/jg-you/cascading_detection"><i class="fa fa-github fa-2x" aria-hidden="true"></i> github</a><br/>
<a href="http://dx.doi.org/10.5281/zenodo.31510" ><img src="https://zenodo.org/badge/doi/10.5281/zenodo.31510.svg" alt="10.5281/zenodo.31510"></a>
</div>

This repository contains a python implementation of the [cascading detection meta-algorithm](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0140133).
It is a wrapper around other existing community detection algorithms.
It keeps track of nodes' identity through multiple passes of these algorithms and produces extensive logs containing: time spent on each pass, edge list, and the clusters detected at each pass.
The wrapper currently handles [CFinder](http://www.cfinder.org/) (Palla et al.), [link clustering](https://github.com/bagrow/linkcomm) (Ahn et al.) and [GCE](https://sites.google.com/site/greedycliqueexpansion/) (Lee at al.).

<div class="end-of-post"></div>
          
### gists
<div class="code-links">
<a href="https://gist.github.com/jg-you"><i class="fa fa-github fa-2x" aria-hidden="true"></i> github</a>
</div>
I sometimes write small and self-contained examples to teach myself new languages and features. I gather the most successful outcomes of these experiments on my _github gist_ page.
      
<div class="end-of-post"></div>
          
