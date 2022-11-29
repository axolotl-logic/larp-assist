import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import MotdsList from 'components/MotdsList.vue';

installQuasar();

describe('MotdsList Component', () => {
  it('should mount component todos', () => {
    const wrapper = mount(MotdsList, {
      props: {},
    });
  });
});