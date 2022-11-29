import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CrudTable from 'components/CrudTable.vue';

installQuasar();

describe('CrudTable Component', () => {
  it('should mount component todos', () => {
    const wrapper = mount(CrudTable, {
      props: {},
    });
  });
});