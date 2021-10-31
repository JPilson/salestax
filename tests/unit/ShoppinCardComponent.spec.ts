import {mount} from "@vue/test-utils";
import ShoppingCartComponent from "@/components/ShoppingCartComponent.vue";
import Order from "@/models/Order.model";
import ProductModel, {ProductCategory} from "@/models/Product.model";


/**
 * Test Definition/ Implementation
 * @param testInput
 * @param expectedOutput
 * @constructor
 */
 async function TestShoppingCartComponent(testInput: Order, expectedOutput: string): Promise<void> {
     const wrapper = mount(ShoppingCartComponent, {
         propsData: {
             order: testInput
         }
     })
     await wrapper.getComponent({ref: "renderBtn"}).trigger("click")
     // expect(wrapper.text()).toContain(expectedOutput)
    expect(wrapper.text()).toEqual(expectedOutput)


 }

describe("Test: Receipt Results", ()=>{
   it("renders caseOneResult when clicked",()=>TestShoppingCartComponent(caseOneInput,caseOneResult))
    it(`renders caseTwoResult when clicked`,()=> TestShoppingCartComponent(caseTwoInput,caseTwoResult))
    it(`renders caseThreeResult when clicked`,()=> TestShoppingCartComponent(caseThreeInput,caseThreeResult))
})
/**
 * Test
 * Inputs and expectations
 */

const caseOneInput = new Order(
    {products:[ new ProductModel({name:"1 book",isImported:false,price:12.49,category:ProductCategory.book}),
            new ProductModel({name:"1 music CD",isImported:false,price:14.99,category:ProductCategory.discography}),
            new ProductModel({name:"1 chocolate bar",isImported:false,price:0.85,category:ProductCategory.food}),
        ]})

const caseOneResult = "1 book: 12.49\n" +
    "1 music CD: 16.49\n" +
    "1 chocolate bar: 0.85\n" +
    "Sales Taxes: 1.50\n" +
    "Total: 29.83";

const caseTwoInput = new Order(
    {products:[
            new ProductModel({name:"1 imported box of chocolates",isImported:true,price:10.00,category:ProductCategory.food}),
            new ProductModel({name:"1 imported bottle of perfume",isImported:true,price:47.50,category:ProductCategory.other}),
        ]})

const caseTwoResult = "1 imported box of chocolates: 10.50\n" +
    "1 imported bottle of perfume: 54.65\n" +
    "Sales Taxes: 7.65\n" +
    "Total: 65.15";

const caseThreeInput = new Order(
    {products:[ new ProductModel({name:"1 imported bottle of perfume",isImported:true,price:27.99,category:ProductCategory.other}),
            new ProductModel({name:"1 bottle of perfume",isImported:false,price:18.99,category:ProductCategory.other}),
            new ProductModel({name:"1 packet of headache pills",isImported:false,price:9.75,category:ProductCategory.medical}),
            new ProductModel({name:"1 imported box of chocolates",isImported:true,price:11.25,category:ProductCategory.food}),
        ]})

const caseThreeResult = "1 imported bottle of perfume: 32.19\n" +
    "1 bottle of perfume: 20.89\n" +
    "1 packet of headache pills: 9.75\n" +
    "1 imported box of chocolates: 11.85\n" +
    "Sales Taxes: 6.70\n" +
    "Total: 74.68"

