import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LoginForm from 'components/LoginForm.vue';

installQuasar();

describe('LoginForm Component', () => {
  it('should mount component todos', () => {
    const wrapper = mount(LoginForm, {
      props: {},
    });
  });
});