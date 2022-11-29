import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import DivinationCrudTable from 'components/DivinationCrudTable.vue';

installQuasar();

describe('DivinationCrudTable Component', () => {
  it('should mount component todos', () => {
    const wrapper = mount(DivinationCrudTable, {
      props: {},
    });
  });
});