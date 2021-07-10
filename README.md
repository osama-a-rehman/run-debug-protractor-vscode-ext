# Run/Debug Protractor Tests

An extension that allows running and debugging protractor tests both individually and collectively.

![How extension provides buttons for executing protractor tests](./images/usage.png)

## Extension Settings

This extension contributes the following settings:

-   `protractor.path`: Path to protractor executable file for tests execution.
-   `protractor.config.path`: Path to protractor configuration file (protractor.conf.js) to use for tests execution.

## Sample Guide

##### 1) Protractor Sample

1. Download the sample and Install the "Run/Debug Protractor tests" extension.
2. Run `npm install` on the sample to install the dependencies, and `node node_modules/protractor/bin/webdriver-manager update` on protractor to install chrome binaries.
3. Start the selenium server with `node node_modules/protractor/bin/webdriver-manager start`.
4. Set the `protractor.path` extension setting to the file path of protractor binary `<SAMPLE_DIRECTORY>/node_modules/protractor/bin/protractor` and `protractor.config.path` extension setting to the path of the protractor.conf.js in our case `<SAMPLE_DIRECTORY>/protractor.conf.js`.
5. Run/Debug tests using the available buttons above `it(...)` to run/debug individual test or `describe(...)` to run all the tests within it.

## History

See changelog

## License

This software is released under [MIT License](http://www.opensource.org/licenses/mit-license.php)
