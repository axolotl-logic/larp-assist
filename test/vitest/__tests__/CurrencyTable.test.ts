import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CurrencyTable from 'components/CurrencyTable.vue';

installQuasar();

describe('CurrencyTable Component', () => {
  it('should mount component todos', () => {
    const wrapper = mount(CurrencyTable, {
      props: {},
    });
  });
});