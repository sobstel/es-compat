const { RuleTester } = require('eslint');

// Browser that doesn't support any features of this version - see es-versions.md
process.env.BROWSERSLIST = 'Chrome >= 65';
jest.resetModules();

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2019,
  },
});

ruleTester.run('compat', require('../rule'), {
  valid: [
    {
      code: 'const flat = residentialAddress.flat;',
    },
    {
      code: 'residentialAddress.flat = flat;',
    },
  ],
  invalid: [
    {
      code: 'foo.flat();',
      errors: [{ message: "ES2019 method 'Array.prototype.flat' is forbidden" }],
    },
    {
      code: 'Array.prototype.flatMap;',
      errors: [{ message: "ES2019 method 'Array.prototype.flatMap' is forbidden" }],
    },
    {
      // eslint-disable-next-line no-irregular-whitespace
      code: `const u2028 = ' ';`, // line separator character \u2028 is in this string
      errors: [{ message: "ES2019 '\\u2028' in string literals is forbidden." }],
    },
    {
      code: 'Object.fromEntries();',
      errors: [{ message: "ES2019 'Object.fromEntries' method is forbidden." }],
    },
    {
      code: 'try {} catch {}',
      errors: [{ message: "ES2019 optional 'catch' binding is forbidden." }],
    },
    {
      code: 'foo.trimLeft();',
      errors: [{ message: "ES2019 method 'String.prototype.trimLeft' is forbidden" }],
    },
    {
      code: 'String.prototype.trimEnd;',
      errors: [{ message: "ES2019 method 'String.prototype.trimEnd' is forbidden" }],
    },
  ],
});
