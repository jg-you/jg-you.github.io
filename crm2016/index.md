---
layout: page
title: 2016 CRM Summer School on Spectral Theory and applications
---

This pages contains the references that I gathered while preparing my lecture for the 2016 CRM Summer School, which took place in Québec, Canada.

### Material of the talk

* [ipython notebook (python 3)](https://github.com/jg-you/jg-you.github.io/blob/master/crm2016/notebooks/young2016_crm_spectral.ipynb)

* [slides](https://speakerdeck.com/jgyou/spectral-clustering-of-graphs)

* lecture notes [in revision]

### Resources

#### Papers
* [Tutorial on Spectral Clustering by Ulrike von Luxburg (2007)](http://www.kyb.mpg.de/fileadmin/user_upload/files/publications/attachments/Luxburg07_tutorial_4488%5b0%5d.pdf)

* [Continuous maximization point of view of graph clustering (M. A. Riolo and M.E.J. Newman, 2014)](http://arxiv.org/abs/1209.5969)

* [Equivalent paper for the modularity matrix (P. Zhang and M.E.J. Newman, 2015)](http://arxiv.org/abs/1507.05108)

* [Shape of the spectrum: Graph Bisection of the planted partition model [Random matrix theory] (R.R. Nadakuditi and M.E.J. Newman, 2012)](http://arxiv.org/abs/1208.1275)

* [Shape of the spectrum: Graph clustering of the stochastic block model [Random matrix theory] (T. Peixoto 2013)](http://arxiv.org/abs/1306.2507)

#### Software

* [networkx](https://networkx.github.io/): Simple graph module in pure python. It comes with multiple functions and methods out-of-the-box.

* [graph_tool](https://graph-tool.skewed.de/): Graph module for python, in cython. Favors the statistical approach, but the module includes some spectral methods. It's fast.

* [scikit-learn](http://scikit-learn.org/): Machine learning in python. Include spectral methods, k-means, and more.

* [seaborn](https://web.stanford.edu/~mwaskom/software/seaborn/): visualization. Straigtforward visualization module, perfect for spectral density plots.
