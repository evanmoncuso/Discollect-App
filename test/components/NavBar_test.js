import { renderComponent, expect } from './test_helper';
import NavBar from '../../app/scripts/components/NavBar';

describe('NavBar', () => {
  let component;
  beforeEach(() => {
    component = renderComponent(NavBar);
  });
  it('has a child with class of login_container', () => {
    expect(component.find('.nav_container')).to.exist;
  });
});