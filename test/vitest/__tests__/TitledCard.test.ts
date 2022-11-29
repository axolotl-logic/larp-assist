import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TitledCard from 'components/TitledCard.vue';

installQuasar();

describe('TitledCard Component', () => {
  it('should mount component todos', () => {
    const wrapper = mount(TitledCard, {
      props: {},
    });
  });
});