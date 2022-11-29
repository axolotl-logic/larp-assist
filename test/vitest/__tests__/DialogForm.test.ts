import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import DialogForm from 'components/DialogForm.vue';

installQuasar();

describe('DialogForm Component', () => {
  it('should mount component todos', () => {
    const wrapper = mount(DialogForm, {
      props: {},
    });
  });
});