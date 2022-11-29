import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import MotdCrudTable from 'components/MotdCrudTable.vue';

installQuasar();

describe('MotdCrudTable Component', () => {
  it('should mount component todos', () => {
    const wrapper = mount(MotdCrudTable, {
      props: {},
    });
  });
});