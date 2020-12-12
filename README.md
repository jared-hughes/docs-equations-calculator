# Docs Equations Calculator

Work in Progress.

## Goals:

As a user, I can:

- [ ] compute mathematical expressions such as `1+2` without leaving Docs
- [ ] compute more complicated expressions that involve simple math functions such as fractions, square roots, logarithms, exponents, etc.
- [ ] compute sums, products, integrals
- [ ] verify that the system is computing the expression I want it to compute
- [ ] recompute existing calculations if I change one part of the expression
- [ ] represent the answer as a fraction or decimal
- [ ] represent the variable in terms of variables
- [ ] represent the answer in terms of pi, e, or other constants

Implementation plan:

- [x] convert Docs Equation to LaTeX and show expression in box
- [ ] compute answer using existing software. Ideas:
  - [Wolfram Alpha](https://products.wolframalpha.com/api/libraries/javascript/) (preferred because it's symbolic)
  - [Evaluatex](https://arthanzel.github.io/evaluatex/)
- [ ] place output answer back into document
- [ ] choice for output format

API Keys (AppID)
