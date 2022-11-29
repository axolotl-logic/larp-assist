import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TransactionDialogForm from 'components/TransactionDialogForm.vue';

installQuasar();

describe('TransactionDialogForm Component', () => {
  it('should mount component todos', () => {
    const wrapper = mount(TransactionDialogForm, {
      props: {},
    });
  });
});