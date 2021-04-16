import React from 'react';
import { render, screen } from '@testing-library/react';
import { CharacterDetails } from '@components/character-list';
import { LUKE_SKYWALKER } from '@packages/data';

describe('CharacterDetails', () => {

  beforeEach(() => {
    render(<CharacterDetails character={LUKE_SKYWALKER} />);
  });

  it('should render the expected details', () => {
    const elements = {
      birthYearEl: screen.getByText(LUKE_SKYWALKER.birthYear),
      eyeColorEl: screen.getByText(LUKE_SKYWALKER.eyeColor),
      genderEl: screen.getByText(LUKE_SKYWALKER.gender),
      heightEl: screen.getByText(LUKE_SKYWALKER.height),
      massEl: screen.getByText(LUKE_SKYWALKER.mass),
      skinColorEl: screen.getByText(LUKE_SKYWALKER.skinColor),
      homeworldEl: screen.getByText(LUKE_SKYWALKER.homeworld.name),
    }
    
    Object.entries(elements).forEach(([key, value], index) => {
      expect(key).toBeDefined();
    });
  });
});