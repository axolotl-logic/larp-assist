import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TransactionCrudTable from 'components/TransactionCrudTable.vue';

installQuasar();

describe('TransactionCrudTable Component', () => {
  it('should mount component todos', () => {
    const wrapper = mount(TransactionCrudTable, {
      props: {},
    });
  });
});