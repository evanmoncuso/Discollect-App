import { renderComponent, expect } from '../test_helper';
import App from '../../app/scripts/components/App';

describe('App', () => {
  let component;
  beforeEach(() => {
    component = renderComponent(App);
  });
  it('tests for truthiness', () => {
    expect(true).to.equal(true);
  });
  it('has a class of app', () => {
    expect(component.hasClass('app')).to.equal(true);
  });
});

