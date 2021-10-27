
export interface LanguageType{
    sample:string;
    id:string;
    email:string;
    password:string;
    enter:string;
    forgotPassword:string;
    activateAccount:string;
    login:string;
    activationCode:string;
    activate:string;
    defineYourPassword:string;
    aboutDefiningPassword:string;
    newPassword:string;
    continue:string;
    errorOnLogin:string;
    enterRef:string;
    reference:string;
}
export default {
    pt:{

        reference:"Referencia",
        sample:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea"
    } as LanguageType,
    en:{
        reference:"Reference",
        sample:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea"

    } as LanguageType
}