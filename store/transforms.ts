export function inboundSetTranform<T, U>(childTransform: (val: T) => U) {
  return (inbound: Set<T>): Array<U> => Array.from(inbound).map(childTransform);
}

export function outboundSetTransform<U, T>(childTransform: (val: U) => T) {
  return (outbound: Array<U>): Set<T> => new Set(outbound.map(childTransform));
}

export function inboundMapTransform<K, T, U>(childTransform: (val: T) => U) {
  return (inbound: Map<K, T>): Array<[K, U]> => Array.from(inbound.entries())
    .map(([key, val]) => [key, childTransform(val)]);
}

export function outboundMapTransform<K, U, T>(childTransform: (val: U) => T) {
  return (outbound: Array<[K, U]>): Map<K, T> => {
    const map = new Map();
    for (const [key, val] of outbound) {
      map.set(key, childTransform(val));
    }
    return map;
  }
}
