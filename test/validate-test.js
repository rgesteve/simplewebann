var test = require('tape');
const validateAnnotation = require('validate-web-annotation');

const targetIri = 'http://example.com/page1'
const context = 'http://www.w3.org/ns/anno.jsonld'
const basicAnnotation = {
  '@context': context,
  id: 'http://example.org/anno1',
  type: 'Annotation',
  target: targetIri,
}

test('validation test', function(t) {
    // t.equal(true, true);
    t.ok(validateAnnotation(basicAnnotation));
});
