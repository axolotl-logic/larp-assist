import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CharacterSelect from 'components/CharacterSelect.vue';

installQuasar();

describe('CharacterSelect Component', () => {
  it('should mount component todos', () => {
    const wrapper = mount(CharacterSelect, {
      props: {},
    });
  });
});