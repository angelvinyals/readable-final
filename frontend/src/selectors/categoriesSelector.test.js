/* global describe, it, expect */

import {
  getCategories,
  getCategoriesFetchError,
  getCategoriesisLoading,
  validCategoryUrl,
} from './categoriesSelectors';


describe('selectors for categories', () => {
  it('should select category loading status', () => {
    const selectedState = {
      categoriesReducer: {
        react: { name: 'react', path: 'react' },
        redux: { name: 'redux', path: 'redux' },
        udacity: { name: 'udacity', path: 'udacity' },
        status: { error: false, loading: false },
      },
    };
    const expectedValue = false;
    expect(getCategoriesisLoading(selectedState)).toEqual(expectedValue);
  });

  it('should select category error status', () => {
    const selectedState = {
      categoriesReducer: {
        status: { error: true, loading: false },
      },
    };
    const expectedValue = true;
    expect(getCategoriesFetchError(selectedState)).toEqual(expectedValue);
  });

  it('should select categories as an array', () => {
    const selectedState = {
      categoriesReducer: {
        react: { name: 'react', path: 'react' },
        redux: { name: 'redux', path: 'redux' },
        udacity: { name: 'udacity', path: 'udacity' },
        status: { error: false, loading: false },
      },
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
    expect(getCategories(selectedState)).toEqual(expectedValue);
  });

  it('should fail gracefully if categories are undefined', () => {
    const selectedState = {
      categoriesReducer: {
        status: { error: true, loading: false },
      },
    };
    const expectedValue = [];
    expect(getCategories(selectedState)).toEqual(expectedValue);
  });

  it('should confirm a category url is valid', () => {
    const selectedState = {
      categoriesReducer: {
        react: { name: 'react', path: 'react' },
        redux: { name: 'redux', path: 'redux' },
        udacity: { name: 'udacity', path: 'udacity' },
        status: { error: false, loading: false },
      },
    };
    const urlParam = 'react';
    expect(validCategoryUrl(selectedState, urlParam)).toBeTruthy();
  });

  it('should confirm a category url is invalid', () => {
    const selectedState = {
      categoriesReducer: {
        react: { name: 'react', path: 'react' },
        redux: { name: 'redux', path: 'redux' },
        udacity: { name: 'udacity', path: 'udacity' },
        status: { error: false, loading: false },
      },
    };
    const urlParam = 'python';
    expect(validCategoryUrl(selectedState, urlParam)).toBeFalsy();
  });
});
