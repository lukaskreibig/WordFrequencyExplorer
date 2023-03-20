/**
 * Compare two word count maps for equality.
 *
 * @param {Record<string, number>} map1 - The first word count map.
 * @param {Record<string, number>} map2 - The second word count map.
 * @returns {boolean} True if the maps are equal, false otherwise.
 */
 export const isEqual = (
    map1: Record<string, number>,
    map2: Record<string, number>
  ): boolean => {
    const keys1 = Object.keys(map1);
    const keys2 = Object.keys(map2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (const key of keys1) {
      if (map1[key] !== map2[key]) {
        return false;
      }
    }
  
    return true;
  };
  