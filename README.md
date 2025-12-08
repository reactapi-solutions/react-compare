[![React Fast Compare — Formidable, We build the modern web](https://raw.githubusercontent.com/FormidableLabs/react-fast-compare/master/react-fast-compare-Hero.png)](https://formidable.com/open-source/)

[![Downloads][downloads_img]][npm_site]
[![Bundle Size][bundle_img]](#bundle-size)
[![GH Actions Status][actions_img]][actions_site]
[![Coverage Status][cov_img]][cov_site]
[![npm version][npm_img]][npm_site]
[![Maintenance Status][maintenance_img]](#maintenance-status)

The fastest deep equal comparison for React. Very quick general-purpose deep
comparison, too. Great for `React.memo` and `shouldComponentUpdate`.

This is a fork of the brilliant
[fast-deep-equal](https://github.com/epoberezkin/fast-deep-equal) with some
extra handling for React.

![benchmark chart](https://raw.githubusercontent.com/FormidableLabs/react-fast-compare/master/assets/benchmarking.png "benchmarking chart")

(Check out the [benchmarking details](#benchmarking-this-library).)

## Install

```sh
$ yarn add react-fast-compare
# or
$ npm install react-fast-compare
```

## Highlights

- ES5 compatible; works in node.js (0.10+) and browsers (IE9+)
- deeply compares any value (besides objects with circular references)
- handles React-specific circular references, like elements
- checks equality Date and RegExp objects
- should as fast as [fast-deep-equal](https://github.com/epoberezkin/fast-deep-equal) via a single unified library, and with added guardrails for circular references.
- small: under 660 bytes minified+gzipped

## Usage

```jsx
const isEqual = require("react-fast-compare");

// general usage
console.log(isEqual({ foo: "bar" }, { foo: "bar" })); // true

// React.memo
// only re-render ExpensiveComponent when the props have deeply changed
const DeepMemoComponent = React.memo(ExpensiveComponent, isEqual);

// React.Component shouldComponentUpdate
// only re-render AnotherExpensiveComponent when the props have deeply changed
class AnotherExpensiveComponent extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }
  render() {
    // ...
  }
}
```

## Do I Need `React.memo` (or `shouldComponentUpdate`)?

> What's faster than a really fast deep comparison? No deep comparison at all.

—This Readme

Deep checks in `React.memo` or a `shouldComponentUpdate` should not be used blindly.
First, see if the default
[React.memo](https://reactjs.org/docs/react-api.html#reactmemo) or
[PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent)
will work for you. If it won't (if you need deep checks), it's wise to make
sure you've correctly indentified the bottleneck in your application by
[profiling the performance](https://reactjs.org/docs/optimizing-performance.html#profiling-components-with-the-chrome-performance-tab).
After you've determined that you _do_ need deep equality checks and you've
identified the minimum number of places to apply them, then this library may
be for you!

## Benchmarking this Library

The absolute values are much less important than the relative differences
between packages.

Benchmarking source can be found
[here](https://github.com/FormidableLabs/react-fast-compare/blob/master/benchmark/index.js).
Each "operation" consists of running all relevant tests. The React benchmark
uses both the generic tests and the react tests; these runs will be slower
simply because there are more tests in each operation.

The results below are from a local test on a laptop _(stats last updated 6/2/2020)_:

### Generic Data

```
react-fast-compare x 177,600 ops/sec ±1.73% (92 runs sampled)
fast-deep-equal x 184,211 ops/sec ±0.65% (87 runs sampled)
lodash.isEqual x 39,826 ops/sec ±1.32% (86 runs sampled)
nano-equal x 176,023 ops/sec ±0.89% (92 runs sampled)
shallow-equal-fuzzy x 146,355 ops/sec ±0.64% (89 runs sampled)
  fastest: fast-deep-equal
```

`react-fast-compare` and `fast-deep-equal` should be the same speed for these
tests; any difference is just noise. `react-fast-compare` won't be faster than
`fast-deep-equal`, because it's based on it.

### React and Generic Data

```
react-fast-compare x 86,392 ops/sec ±0.70% (93 runs sampled)
fast-deep-equal x 85,567 ops/sec ±0.95% (92 runs sampled)
lodash.isEqual x 7,369 ops/sec ±1.78% (84 runs sampled)
  fastest: react-fast-compare,fast-deep-equal
```

Two of these packages cannot handle comparing React elements, because they
contain circular reference: `nano-equal` and `shallow-equal-fuzzy`.

### Running Benchmarks

```sh
$ yarn install
$ yarn run benchmark
```

## Differences between this library and `fast-deep-equal`

`react-fast-compare` is based on `fast-deep-equal`, with some additions:

- `react-fast-compare` has `try`/`catch` guardrails for stack overflows from undetected (non-React) circular references.
- `react-fast-compare` has a _single_ unified entry point for all uses. No matter what your target application is, `import equal from 'react-fast-compare'` just works. `fast-deep-equal` has multiple entry points for different use cases.

This version of `react-fast-compare` tracks `fast-deep-equal@3.1.1`.

## Bundle Size

There are a variety of ways to calculate bundle size for JavaScript code.
You can see our size test code in the `compress` script in
[`package.json`](https://github.com/FormidableLabs/react-fast-compare/blob/master/package.json).
[Bundlephobia's calculation](https://bundlephobia.com/result?p=react-fast-compare) is slightly higher,
as they [do not mangle during minification](https://github.com/pastelsky/package-build-stats/blob/v6.1.1/src/getDependencySizeTree.js#L139).

## License

[MIT](https://github.com/FormidableLabs/react-fast-compare/blob/readme/LICENSE)

## Contributing

Please see our [contributions guide](./CONTRIBUTING.md).

## Maintenance Status

**Active:** Formidable is actively working on this project, and we expect to continue for work for the foreseeable future. Bug reports, feature requests and pull requests are welcome.
################
Project Overview & Feature Description #####################

1️⃣ Project Introduction

The PAMS tool is designed to compare application configurations deployed across different global regions. It ensures consistency by identifying configuration gaps between environments where the same application is installed. Any differences detected are highlighted on the Frontend UI, enabling quick review and corrective action.

The tool originated from incidents caused by configuration mismatches (e.g., in the APAC region), where it was unclear whether the gap was due to missed implementation or missing customer requests. To prevent repeated issues and maintain global uniformity, PAMS now continuously monitors configuration deviations.

2️⃣ Core Objectives

Ensure cross-region configuration consistency for PSAAS applications.

Provide complete visibility of device inventory and deployment details.

Enable proactive detection and remediation of configuration gaps.

Streamline configuration validation using automated comparison logic.

3️⃣ Key Features
A. Inventory Management

This feature dynamically retrieves inventory details from the Verum system and displays a comprehensive device summary including:

Locations of deployed devices

Model numbers

Device counts by model and region

Assigned applications / PSAAS device mapping

A dedicated dashboard provides clear visualization of all assets assigned globally.

B. Cross-Region Configuration Comparison

This feature ensures that the same application installed in different regions maintains consistent configuration.

Process Flow:

Retrieve complete PSAAS inventory from Verum.

Filter PSAAS devices and trigger NETCAP to capture configurations.

Parse the configuration and segregate into:

LTM Database

ASM Database

Identify configuration details per FQDN (each FQDN = one application).

Map application to its respective PSAAS port code or port number.

Compare consistency between deployed regions.

Display any mismatches or differences on the Frontend UI.

C. Verum Query Integration

An on-demand querying capability is built into the tool, allowing users to:

Fetch live inventory data

Validate deployment status

Run custom summary reports as needed

4️⃣ Why PAMS?

Prevent outages caused by critical configuration mismatch

Reduce manual dependency and human error

Quickly verify if changes are uniformly implemented

Provide a unified source of truth for configuration status

5️⃣ Expected Outcome

Any identified configuration differences are clearly flagged in the UI. This enables operations teams to take immediate corrective actions and maintain global compliance for all PSAAS applications.

In Summary

PAMS acts as an intelligent verification system ensuring:
➡ Global configuration consistency
➡ Accurate inventory visibility
➡ Faster issue triaging
➡ Reduced operational risks


#######
######

[actions_img]: https://github.com/FormidableLabs/react-fast-compare/actions/workflows/ci.yml/badge.svg
[actions_site]: https://github.com/formidablelabs/react-fast-compare/actions/workflows/ci.yml
[cov_img]: https://codecov.io/gh/FormidableLabs/react-fast-compare/branch/master/graph/badge.svg
[cov_site]: https://codecov.io/gh/FormidableLabs/react-fast-compare
[npm_img]: https://badge.fury.io/js/react-fast-compare.svg
[npm_site]: http://badge.fury.io/js/react-fast-compare
[appveyor_img]: https://ci.appveyor.com/api/projects/status/github/formidablelabs/react-fast-compare?branch=master&svg=true
[appveyor_site]: https://ci.appveyor.com/project/FormidableLabs/react-fast-compare
[bundle_img]: https://img.shields.io/badge/minzipped%20size-656%20B-flatgreen.svg
[downloads_img]: https://img.shields.io/npm/dm/react-fast-compare.svg
[maintenance_img]: https://img.shields.io/badge/maintenance-active-flatgreen.svg
