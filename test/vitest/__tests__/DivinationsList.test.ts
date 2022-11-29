import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import DivinationsList from 'components/DivinationsList.vue';

installQuasar();

describe('DivinationsList Component', () => {
  it('should mount component todos', () => {
    const wrapper = mount(DivinationsList, {
      props: {},
    });
  });
});