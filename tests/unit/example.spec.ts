import {mount, shallowMount} from '@vue/test-utils'
import ShoppingCartComponent from "@/components/ShoppingCartComponent.vue";

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(ShoppingCartComponent, {
//       propsData: { message:msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })

let wrapper: any;

beforeEach(() => {
  wrapper = mount(ShoppingCartComponent, {
    propsData: {
      message: "Hello world"
    }
  });
});

it(".message = 'Hello world'", () => {
  expect(wrapper.vm.message).toEqual("Hello world");
});