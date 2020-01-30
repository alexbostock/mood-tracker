import {
  inboundMapTransform,
  inboundSetTranform,
  outboundMapTransform,
  outboundSetTransform
} from './transforms';

describe('reusable store transformations', () => {
  it('serialises and deserialises sets', () => {
    const original = new Set(['a', 'b', 'c']);

    const serialised = inboundSetTranform(x => x)(original);
    const deserialised = outboundSetTransform(x => x)(serialised);

    expect(deserialised).toStrictEqual(original);
  });

  it('serialises and deserialises map', () => {
    const original = new Map();
    original.set('a', 26);
    original.set('b', 25);
    original.set('c', 24);

    const serialised = inboundMapTransform(x => x)(original);
    const deserialised = outboundMapTransform(x => x)(serialised);

    expect(deserialised).toStrictEqual(original);
  });

  it('serialises and deserialises nested structures', () => {
    const original = new Map();
    original.set('a', new Set(['a', 'b', 'c']));
    original.set('b', new Set(['b', 'c', 'd']));
    original.set('c', new Set(['c', 'd', 'e']));

    const serialised = inboundMapTransform(inboundSetTranform(x => x))(original);
    const deserialised = outboundMapTransform(outboundSetTransform(x => x))(serialised);

    expect(deserialised).toStrictEqual(original);
  })
});
