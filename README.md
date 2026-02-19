# react-fast-compare

The fastest deep equal comparison for React. Really fast general-purpose deep comparison.
Great for`shouldComponentUpdate`. This is a fork of the brilliant
[fast-deep-equal](https://github.com/epoberezkin/fast-deep-equal) with some
extra handling for React.

[![Travis Status][trav_img]][trav_site]
[![AppVeyor Status][appveyor_img]][appveyor_site]
[![npm version][npm_img]][npm_site]
[![size_minzip][size_minzip]][size_site]
[![size_min][size_min]][size_site]

![benchmark chart](assets/benchmarking.png "benchmarking chart")

(Check out the [benchmarking details](#benchmarking-this-library).)

## Install

```sh
$ yarn add react-fast-compare
# or
$ npm install react-fast-compare
```

## Highlights

* ES5 compatible; works in node.js (0.10+) and browsers (IE9+)
* deeply compares any value (besides objects with circular references)
* handles React-specific circular references, like elements
* checks equality Date and RegExp objects
* should be just as fast as [fast-deep-equal](https://github.com/epoberezkin/fast-deep-equal) for general use, and faster for React use
* small: under 600 bytes minified+gzipped

## Usage

```jsx
const isEqual = require("react-fast-compare");

// general usage
console.log(isEqual({ foo: "bar" }, { foo: "bar" })); // true

// react usage
class ExpensiveRenderer extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }
  render() {
    // ...
  }
}
```

## Do I Need `shouldComponentUpdate`?

> What's faster than a really fast deep comparion? No deep comparison at all.

—This Readme

Deep checks in React's `shouldComponentUpdate` should not be used blindly.
First, see if a
[PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent)
would work for you. If it won't (if you need deep checks), it's wise to make
sure you've correctly indentified the bottleneck in your application by
[profiling the performance](https://reactjs.org/docs/optimizing-performance.html#profiling-components-with-the-chrome-performance-tab).
After you've determined that you _do_ need deep equality checks and you've
identified the minimum number of places to apply them, then this library may
be for you! For more information about making your app faster, check out the
[Optimizing Performance](https://reactjs.org/docs/optimizing-performance.html)
section of the React docs.

## Benchmarking this Library

All tests carried out locally on a MacBook. The absolute values are much less
important than the relative differences between packages.

Benchmarking source can be found
[here](https://github.com/FormidableLabs/react-fast-compare/blob/master/node/tests.js).
Each "operation" consists of running all relevant tests. The React benchmark
uses both the generic tests and the react tests; these runs will be slower
simply because there are more tests in each operation.

### Generic Data

```
react-fast-compare x 207,503 ops/sec ±0.54% (92 runs sampled)
fast-deep-equal x 195,006 ops/sec ±0.70% (91 runs sampled)
lodash.isEqual x 43,778 ops/sec ±0.55% (91 runs sampled)
nano-equal x 198,036 ops/sec ±0.37% (95 runs sampled)
shallow-equal-fuzzy x 173,023 ops/sec ±0.59% (95 runs sampled)
  fastest: react-fast-compare
```

`react-fast-compare` and `fast-deep-equal` should be the same speed for these
tests; any difference is just noise. `react-fast-compare` won't be faster than
`fast-deep-equal`, because it's based on it.

### React and Generic Data

```
react-fast-compare x 187,628 ops/sec ±0.58% (93 runs sampled)
fast-deep-equal x 477 ops/sec ±0.55% (91 runs sampled)
lodash.isEqual x 35,100 ops/sec ±0.16% (95 runs sampled)
nano-equal x 468 ops/sec ±0.53% (94 runs sampled)
shallow-equal-fuzzy x 684 ops/sec ±0.43% (92 runs sampled)
  fastest: react-fast-compare
```

Three of these packages cannot handle comparing React elements (which are
circular): `fast-deep-equal`, `nano-equal`, and `shallow-equal-fuzzy`.

### Running Benchmarks

```sh
$ yarn install
$ yarn run benchmark
```

## fast-deep-equal Versioning

react-fast-compare@2.0.0 tracks fast-deep-equal@2.0.1

## License

[MIT](https://github.com/FormidableLabs/react-fast-compare/blob/readme/LICENSE)

## Contributing

Please see our [contributions guide](./CONTRIBUTING.md).

[trav_img]: https://api.travis-ci.org/FormidableLabs/react-fast-compare.svg
[trav_site]: https://travis-ci.org/FormidableLabs/react-fast-compare
[cov_img]: https://img.shields.io/coveralls/FormidableLabs/react-fast-compare.svg
[cov_site]: https://coveralls.io/r/FormidableLabs/react-fast-compare
[npm_img]: https://badge.fury.io/js/react-fast-compare.svg
[npm_site]: http://badge.fury.io/js/react-fast-compare
[appveyor_img]: https://ci.appveyor.com/api/projects/status/github/formidablelabs/react-fast-compare?branch=master&svg=true
[appveyor_site]: https://ci.appveyor.com/project/FormidableLabs/react-fast-compare
[size_min]: https://img.shields.io/bundlephobia/min/react-fast-compare.svg
[size_minzip]: https://img.shields.io/bundlephobia/minzip/react-fast-compare.svg

===

<img width="1024" height="1024" alt="topolo" src="https://github.com/user-attachments/assets/72c6ce73-a683-45c1-886f-3ccc815a1925" />


===
[size_site]: https://bundlephobia.com/result?p=react-fast-compare

====

#```mermaid
flowchart TB

%% =========================
%% HEADER
%% =========================
A["Production Topology"]
B["NADC BIGIQ Active/Standby Deployment"]

A --> B

%% =========================
%% REGIONAL BLOCKS
%% =========================

subgraph NA-NW-C01
direction TB
WAF1["PSaas WAF<br/>[HA Cluster farm]"]
P115["BIQ115[P]"]
S116["BIQ116[S]"]

WAF1 -.-> P115
P115 -.-> WAF1
WAF1 -.-> S116
S116 -.-> WAF1
end

subgraph NA-NW-C02
direction TB
WAF2["PSaas WAF<br/>[HA Cluster farm]"]
P117["BIQ117[P]"]
S118["BIQ118[S]"]

WAF2 -.-> P117
P117 -.-> WAF2
WAF2 -.-> S118
S118 -.-> WAF2
end

subgraph NA-NE-C01
direction TB
WAF3["PSaas WAF<br/>[HA Cluster farm]"]
P116["BIQ116[P]"]
S115["BIQ115[S]"]

WAF3 -.-> P116
P116 -.-> WAF3
WAF3 -.-> S115
S115 -.-> WAF3
end

subgraph NA-NE-C02
direction TB
WAF4["PSaas WAF<br/>[HA Cluster farm]"]
P118["BIQ118[P]"]
S117["BIQ117[S]"]

WAF4 -.-> P118
P118 -.-> WAF4
WAF4 -.-> S117
S117 -.-> WAF4
end

%% =========================
%% CROSS REGION DOTTED LINKS
%% =========================

P115 -.-> P117
P117 -.-> P116
P116 -.-> P118

S116 -.-> S118
S118 -.-> S115
S115 -.-> S117

%% =========================
%% NMS SEGMENT + ENGINEER
%% =========================

NMS["NMS segment"]

ENG["NETWORK ENGINEERS IN LSF SEGMENT"]

ENG --> NMS

NA-NW-C01 --- NMS
NA-NW-C02 --- NMS
NA-NE-C01 --- NMS
NA-NE-C02 --- NMS

