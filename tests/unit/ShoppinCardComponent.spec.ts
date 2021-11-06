import {createLocalVue, mount} from "@vue/test-utils";
import Order from "@/models/Order.model";
import ProductModel, {ProductCategory} from "@/models/Product.model";
import ShoppingCartTest from "@/components/ShoppingCartTest.vue";


/**
 * Test Definition/ Implementation
 * @param testInput
 * @param expectedOutput
 * @constructor
 */
 async function TestShoppingCartComponent(testInput: Order, expectedOutput: string): Promise<void> {
     const wrapper = mount(ShoppingCartTest, {
         propsData: {
             order: testInput
         }
     })
     await wrapper.getComponent({ref: "renderBtn"}).trigger("click")
     // expect(wrapper.text()).toContain(expectedOutput)
    expect(wrapper.text()).toContain(expectedOutput)


 }

 async function TestRemoveProductFromCart(expectedOrderSize:number):Promise<void>{
     const wrapper = mount(ShoppingCartTest, {
         propsData: {
             order: caseThreeInput as Order
         }
     })
     await (wrapper.vm as any).removeOne(1);
     expect((wrapper.vm as any).order.totalOrder()).toBe(expectedOrderSize);

 }

describe("SalesTax", ()=>{
   it("Case 1",()=>TestShoppingCartComponent(caseOneInput,caseOneResult));
    it(`Case 2`,()=> TestShoppingCartComponent(caseTwoInput,caseTwoResult));
    it(`Case 3`,()=> TestShoppingCartComponent(caseThreeInput,caseThreeResult));
})

describe("Remove Item From Order list",()=>{
    it("case1",()=>TestRemoveProductFromCart(3))
})

/**
 * Test
 * Inputs and expectations
 */

const caseOneInput = new Order(
    {products:[ new ProductModel({name:"book",isImported:false,price:12.49,category:ProductCategory.book}),
            new ProductModel({name:"music CD",isImported:false,price:14.99,category:ProductCategory.discography}),
            new ProductModel({name:"chocolate bar",isImported:false,price:0.85,category:ProductCategory.food}),
        ]})

const caseOneResult = "1 book: 12.49\n" +
    "1 music CD: 16.49\n" +
    "1 chocolate bar: 0.85\n" +
    "Sales Taxes: 1.50\n" +
    "Total: 29.83";

const caseTwoInput = new Order(
    {products:[
            new ProductModel({name:"box of chocolates",isImported:true,price:10.00,category:ProductCategory.food}),
            new ProductModel({name:"bottle of perfume",isImported:true,price:47.50,category:ProductCategory.other}),
        ]})

const caseTwoResult = "1 imported box of chocolates: 10.50\n" +
    "1 imported bottle of perfume: 54.65\n" +
    "Sales Taxes: 7.65\n" +
    "Total: 65.15";

const caseThreeInput = new Order(
    {products:[ new ProductModel({name:"bottle of perfume",isImported:true,price:27.99,category:ProductCategory.other}),
            new ProductModel({name:"bottle of perfume",isImported:false,price:18.99,category:ProductCategory.other}),
            new ProductModel({name:"packet of headache pills",isImported:false,price:9.75,category:ProductCategory.medical}),
            new ProductModel({name:"box of chocolates",isImported:true,price:11.25,category:ProductCategory.food}),
        ]})

const caseThreeResult = "1 imported bottle of perfume: 32.19\n" +
    "1 bottle of perfume: 20.89\n" +
    "1 packet of headache pills: 9.75\n" +
    "1 imported box of chocolates: 11.85\n" +
    "Sales Taxes: 6.70\n" +
    "Total: 74.68"

