# Sales Tax
```
This project is a solution of Coding assignments for itemis CC Cloud & Enterprise recruiting

Basic sales tax is applicable at a rate of 10% on all goods, except books, food, and medical
products that are exempt. Import duty is an additional sales tax
applicable on all imported goods at a rate of 5%, with no exemptions. When I purchase items
I receive a receipt which lists the name of all the items and their
price (including tax), finishing with the total cost of the items,
and the total amounts of sales taxes paid. The rounding rules for 
sales tax are that for a tax rate of n%, 
a shelf price of p contains (np/100 rounded up to the nearest 0.05) amount of sales tax.
```
##Tech Stack
- VueJs
- Typescript
- Vuetify

## Getting started
Clone the project and run the command bellow to install all thr dependencies 
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
Running the command bellow will build the project for 
distribution. The build project will be inside the folder
' dist ' 
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Testing
For testing The Test cases given  run the following command.

```
npm run test:unit --testNamePattern=SalesTax
```
###Test case 1 
```
INPUT:
> 1 book at 12.49 expected 
> 1 music CD at 14.99
> 1 chocolate bar at 0.85

EXPECTED:
> 1 book: 12.49
> 1 music CD: 16.49
> 1 chocolate bar: 0.85 
> Sales Taxes: 1.50
> Total: 29.83
```

###Test case 2
```
INPUT:
> 1 imported box of chocolates at 10.00 
> 1 imported bottle of perfume at 47.50

EXPECTED:
> 1 book: 12.49
> 1 music CD: 16.49
> 1 chocolate bar: 0.85 
> Sales Taxes: 1.50
> Total: 29.83
```

###Test case 3
```
INPUT:
> 1 imported bottle of perfume at 27.99 > 1 bottle of perfume at 18.99
> 1 packet of headache pills at 9.75
> 1 box of imported chocolates at 11.25

EXPECTED:
> 1 imported bottle of perfume: 32.19 > 1 bottle of perfume: 20.89
> 1 packet of headache pills: 9.75
> 1 imported box of chocolates: 11.85 
> Sales Taxes: 6.70
> Total: 74.68
```



