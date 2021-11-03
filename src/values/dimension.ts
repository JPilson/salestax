const dimension:Record<'mobile'|'default', dimensionType> = {
    mobile:{
        imageOfProductInGrid:180,
        imageOfProductInList:180,
        borderRadius:10,
        buttonText:10,
        normalText:14,
    },
    default:{
        imageOfProductInGrid:200,
        imageOfProductInList:150,
        borderRadius:10,
        buttonText:12,
        normalText:18
    }

}

export type dimensionType = {
    imageOfProductInGrid:number
    imageOfProductInList:number,
    borderRadius:number,
    buttonText:number,
    normalText:number

};



export default dimension;