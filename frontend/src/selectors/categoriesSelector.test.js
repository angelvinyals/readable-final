/* global describe, it, expect */

import {
  getCategoriesFromStore,
  getCategoriesFetchError,
  getCategoriesisLoading,
} from './categoriesSelectors';


describe('selectors for categories', () => {
  it('should select category loading status', () => {
    const selectedState = {
        react: { name: 'react', path: 'react' },
        redux: { name: 'redux', path: 'redux' },
        udacity: { name: 'udacity', path: 'udacity' },
        status: { error: false, loading: false },
    };
    const expectedValue = false;
    expect(getCategoriesisLoading(selectedState)).toEqual(expectedValue);
  });

  it('should select category error status', () => {
    const selectedState = {
        status: { error: true, loading: false },
    };
    const expectedValue = true;
    expect(getCategoriesFetchError(selectedState)).toEqual(expectedValue);
  });

  it('should select categories as an array', () => {
    const selectedState = {
        react: { name: 'react', path: 'react' },
        redux: { name: 'redux', path: 'redux' },
        udacity: { name: 'udacity', path: 'udacity' },
        status: { error: false, loading: false },
    };
    const expectedValue = [
      {
        id: 'react',
        name: 'react',
        path: 'react',
      },
      {
        id: 'redux',
        name: 'redux',
        path: 'redux',
      },
      {
        id: 'udacity',
        name: 'udacity',
        path: 'udacity',
      },
    ];
    expect(getCategoriesFromStore(selectedState)).toEqual(expectedValue);
  });

  it('should fail gracefully if categories are undefined', () => {
    const selectedState = {
        status: { error: true, loading: false },
    };
    const expectedValue = [];
    expect(getCategoriesFromStore(selectedState)).toEqual(expectedValue);
  });

});
