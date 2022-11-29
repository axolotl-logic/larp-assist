import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CurrencyCrudTable from 'components/CurrencyCrudTable.vue';

installQuasar();

describe('CurrencyCrudTable Component', () => {
  it('should mount component todos', () => {
    const wrapper = mount(CurrencyCrudTable, {
      props: {},
    });
  });
});