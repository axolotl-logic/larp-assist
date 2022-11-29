import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import RegistrationForm from 'components/RegistrationForm.vue';

installQuasar();

describe('RegistrationForm Component', () => {
  it('should mount component todos', () => {
    const wrapper = mount(RegistrationForm, {
      props: {},
    });
  });
});