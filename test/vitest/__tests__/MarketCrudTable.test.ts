import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import MarketCrudTable from 'components/MarketCrudTable.vue';

installQuasar();

describe('MarketCrudTable Component', () => {
  it('should mount component todos', () => {
    const wrapper = mount(MarketCrudTable, {
      props: {},
    });
  });
});