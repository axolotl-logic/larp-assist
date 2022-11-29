import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import MarketDialogForm from 'components/MarketDialogForm.vue';

installQuasar();

describe('MarketDialogForm Component', () => {
  it('should mount component todos', () => {
    const wrapper = mount(MarketDialogForm, {
      props: {},
    });
  });
});