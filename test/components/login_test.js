import { renderComponent, expect } from '../test_helper';
import Login from '../../app/scripts/components/Login';

describe('Login', () => {
  let component;
  beforeEach(() => {
    component = renderComponent(Login);
  });
  // it('tests for truthiness', () => {
  //   expect(true).to.equal(true);
  // });
  it('has a child with class of login_container', () => {
    expect(component.find('.login_container')).to.exist;
  });
});