import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import MotdDialogForm from 'components/MotdDialogForm.vue';

installQuasar();

describe('MotdDialogForm Component', () => {
  it('should mount component todos', () => {
    const wrapper = mount(MotdDialogForm, {
      props: {},
    });
  });
});