import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import DivinationDialogForm from 'components/DivinationDialogForm.vue';

installQuasar();

describe('DivinationDialogForm Component', () => {
  it('should mount component todos', () => {
    const wrapper = mount(DivinationDialogForm, {
      props: {},
    });
  });
});