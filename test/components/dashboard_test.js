import { renderComponent, expect } from './test_helper';
import Dashboard from '../../app/scripts/components/Dashboard';

describe('Dashboard', () => {
  let component;
  beforeEach(() => {
    component = renderComponent(Dashboard);
  });
  // it('tests for truthiness', () => {
  //   expect(component).to.exist;
  // });
  it('has a class of dashboard_container', () => {
    // console.log('####', component);
    expect(component.find('.dashboard_container')).to.exist;
  });
});
