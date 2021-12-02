export const setItemsReadonly = (collection) => {
  for (const o of collection) {
    Object.freeze(o)
  }
  return collection
}

// thats even better that freezing individually objects, but use it only in places where collection is re-assigned and not mutated
export const setCollectionReadonly = (collection) => {
  return Object.freeze(collection)
}

// * OPTIM: 'if an object is made readonly with Object.freeze, then Vue can’t and doesn’t try to make the object reactive.'
// * There was actually no reason for the internal items of the array to be observable as they are never mutated
// src: https://reside-ic.github.io/blog/handling-long-arrays-performantly-in-vue.js/
// https://vuejs.org/v2/guide/instance.html#Data-and-Methods
// The only exception to this being the use of Object.freeze(),
// which prevents existing properties from being changed, which also means the reactivity system can’t track changes.
