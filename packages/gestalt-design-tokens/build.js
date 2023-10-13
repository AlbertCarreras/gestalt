// @flow strict
const StyleDictionary = require('style-dictionary');

const { fileHeader } = StyleDictionary.formatHelpers;

StyleDictionary.registerFileHeader({
  name: 'flowCustomHeader',
  // defaultMessage contains the 2 lines that appear in the default file header
  fileHeader: (defaultMessage) => [`@flow strict`, ...defaultMessage],
});

StyleDictionary.registerFileHeader({
  name: 'androidCustomHeader',
  fileHeader: () => [`File is autogenerated - do not edit directly`],
});

StyleDictionary.registerTransform({
  name: 'size/pxToDpOrSp',
  type: 'value',
  matcher(prop) {
    return prop.value.match(/^-?[\d.]+px$/);
  },
  transformer(prop) {
    return prop.name.includes('font')
      ? prop.value.replace(/px$/, 'sp')
      : prop.value.replace(/px$/, 'dp');
  },
});

StyleDictionary.registerFormat({
  name: 'customJSArrayFormat',
  formatter: ({ dictionary, file }) => {
    const tokenArray = dictionary.allTokens.map((token) =>
      JSON.stringify({
        name: token.path.join('-'),
        value: token.value,
        darkValue: token.darkValue,
        comment: token.comment,
        category: token.attributes.category,
      }),
    );
    return `${fileHeader({ file, commentStyle: 'short' })} module.exports = [${tokenArray}]`;
  },
});

StyleDictionary.registerFormat({
  name: 'customJSIndividualFormat',
  formatter: ({ dictionary }) =>
    `// @flow strict\n\n${StyleDictionary.format['javascript/es6']({
      dictionary,
    })}`,
});

// $FlowFixMe[missing-local-annot]
function darkFormat(dictionary) {
  return dictionary.allTokens.map((token) => {
    const { darkValue } = token;
    if (darkValue) {
      return { ...token, value: token.darkValue };
    }
    return token;
  });
}

// $FlowFixMe[missing-local-annot]
function darkFormatWrapper(format) {
  // $FlowFixMe[missing-local-annot]
  return (args) => {
    const dictionary = { ...args.dictionary };
    // Override each token's `value` with `darkValue`
    dictionary.allTokens = darkFormat(dictionary);
    // Use the built-in format but with our customized dictionary object
    // so it will output the darkValue instead of the value
    return StyleDictionary.format[format]({
      ...args,
      dictionary,
    });
  };
}

// $FlowFixMe[missing-local-annot]
function addFlowTypes(dictionaryTokens) {
  return `// @flow strict\n/* This file is automatically generated by style-dictionary*/\n\ndeclare module.exports: {|\n${dictionaryTokens
    .map((token) => `  +"${token.name}": ${JSON.stringify(token.value)}`)
    .join(',\n')}\n|}`;
}

function jsonFlatFlow() {
  // $FlowFixMe[missing-local-annot]
  return ({ dictionary }) => addFlowTypes(dictionary.allTokens);
}
function cssDarkJsonFlatFlow() {
  // $FlowFixMe[missing-local-annot]
  return ({ dictionary }) => addFlowTypes(darkFormat(dictionary));
}

StyleDictionary.registerFormat({
  name: 'cssDark',
  formatter: darkFormatWrapper(`css/variables`),
});

StyleDictionary.registerFormat({
  name: 'androidColorDark',
  formatter: darkFormatWrapper(`android/colors`),
});

StyleDictionary.registerFormat({
  name: 'cssDarkJson',
  formatter: darkFormatWrapper(`json/flat`),
});

StyleDictionary.registerFormat({
  name: 'jsonFlatFlow',
  formatter: jsonFlatFlow(),
});
StyleDictionary.registerFormat({
  name: 'cssDarkJsonFlatFlow',
  formatter: cssDarkJsonFlatFlow(),
});

StyleDictionary.registerFilter({
  name: 'customDarkColorFilter',
  matcher(token) {
    return (
      token.darkValue &&
      (token.attributes.category === `color` || token.attributes.category === `elevation`)
    );
  },
});

StyleDictionary.registerFilter({
  name: 'customDataVizFilter',
  matcher(token) {
    return token.attributes.category === `color` && token.attributes.type === `data-visualization`;
  },
});

StyleDictionary.registerTransformGroup({
  name: 'android-custom',
  transforms: ['attribute/cti', 'name/cti/snake', 'color/hex8android', 'size/pxToDpOrSp'],
});

StyleDictionary.extend('config.json').buildAllPlatforms();
