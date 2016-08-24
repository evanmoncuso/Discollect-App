import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import Portal from '../app/scripts/components/Portal';
describe('Portal', () => {
  it('Should render one notification', () => {
    const wrapper = shallow(<Portal count={2}/>);
    expect(wrapper.text()).to.contain('2');
  });

  it('Should handle onClick', () => {

    const handleButtonClick = sinon.spy();
    const wrapper = shallow(
      <Portal count={3} onClick={handleButtonClick} />
    );
    wrapper.find('div').simulate('click', {preventDefault: () => {}});
    expect(handleButtonClick.calledOnce).to.equal(true);
  });

});



// // import React from 'react';
// // import { mount, shallow } from 'enzyme';
// // import Portal from '../app/scripts/components/Portal.jsx';

// // describe('<Portal />', () => {


// // });



// import React from 'react';
// import { expect } from 'chai';
// import { shallow, mount, render } from 'enzyme';
// var Portal = require('../app/scripts/components/Portal').default;

// // describe("A suite", function() {

// //   it ('just wants a green result', () => {
// //     expect(true).to.equal(true)
// //   })

// //   it('calls componentDidMount', () => {
// //     const wrapper = mount(<Portal />);
// //     expect(Portal.prototype.componentDidMount.calledOnce).to.equal(true);
// //   });

// //   // it("contains spec with an expectation", function() {
// //   //   expect(shallow(<Foo />).is('.foo')).to.equal(true);
// //   // });

// //   // it("contains spec with an expectation", function() {
// //   //   expect(mount(<Foo />).find('.foo').length).to.equal(1);
// //   // });
// // });

// describe('<Portal />', () => {


//   it("contains spec with an expectation", function() {
//     expect(shallow(<Portal />).contains(<div className="wrapperDiv" />)).to.equal(true);
//   });
//   // it('calls componentDidMount', () => {
//   //   spy(Portal.prototype, 'componentDidMount');
//   //   const wrapper = mount(<Portal />);
//   //   expect(Portal.prototype.componentDidMount.calledOnce).to.equal(true);
//   // });
//     it ('just wants a green result', () => {
//       expect(true).to.equal(true)
//     })

// it ('just wants a green result', () => {
//       expect(true).to.equal(true)
//     })
// it ('just wants a green result', () => {
//       expect(true).to.equal(true)
//     })
// it ('just wants a green result', () => {
//       expect(true).to.equal(true)
//     })
//   it('allows us to set props', () => {
//     const wrapper = mount(<Portal bar="baz" />);
//     expect(wrapper.props().bar).to.equal("baz");
//     wrapper.setProps({ bar: "Portal" });
//     expect(wrapper.props().bar).to.equal("Portal");
//   });

//   it('simulates click events', () => {
//     const onButtonClick = spy();
//     const wrapper = mount(
//       <Portal onButtonClick={onButtonClick} />
//     );
//     wrapper.find('button').simulate('click');
//     expect(onButtonClick.calledOnce).to.equal(true);
//   });

// });

// // npm run mocha tests/.setup.js tests/tester.js