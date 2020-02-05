import Vue from 'vue';

import Component from './resources/Component.vue';
import ComponentWithTemplateOnly from './resources/ComponentWithTemplateOnly.vue';
import ComponentWithoutExport from './resources/ComponentWithoutExport.vue';
import ComponentWithoutScript from './resources/ComponentWithoutScript.vue';
import ComponentWithoutStyle from './resources/ComponentWithoutStyle.vue';
import SrcImportComponent from './resources/srcImportComponent/SrcImportComponent.vue';


const doTest = (Component, componentName) => {
  const mockFn = jest.fn();

  const vm = new Vue({
    el: document.createElement('div'),
    render: h =>
      h(Component, {
        props: {
          onClick: mockFn,
        },
      }),
  });

  expect(Component.name).toBe(componentName);

  // check if template HTML compiled properly
  expect(vm.$el).toBeDefined();
  expect(vm.$el.querySelector('.lorem-class').textContent).toEqual('some test text');

  // check if template calls vue methods
  vm.$el.querySelector('button').click();
  expect(mockFn.mock.calls[0][0]).toBe('value passed to clickHandler');
};

const doTestWithoutButton = (Component, componentName) => {
  const vm = new Vue({
    el: document.createElement('div'),
    render: h =>
      h(Component,{}),
  });

  expect(Component.name).toBe(componentName);

  // check if template HTML compiled properly
  expect(vm.$el).toBeDefined();
  expect(vm.$el.querySelector('.lorem-class').textContent).toEqual('some test text');
};

describe('preprocessor', () => {
  it('should process a `.vue` file', () => {
    doTest(Component, 'app');
  });

  it('should process a `.vue` file without style tag', () => {
    doTest(ComponentWithoutStyle, 'app');
  });

  it('should process and parse a .vue component containing src referenecs', () => {
    doTest(SrcImportComponent, 'app');
  });

  it('should process a `.vue` file without script tag', () => {
    doTestWithoutButton(ComponentWithoutScript, 'ComponentWithoutScript');
  });

  it('should process a `.vue` file without export in script tag', () => {
    doTestWithoutButton(ComponentWithoutExport, 'ComponentWithoutExport');
  });

  it('should process a `.vue` file with template tag only', () => {
    doTestWithoutButton(ComponentWithTemplateOnly, 'ComponentWithTemplateOnly');
  });

});
