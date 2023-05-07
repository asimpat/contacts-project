const PASSWORD_RULE=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
const PASSWORD_MESSAGE= 'Password should have  atleast one upper case, one lower case,any number and one character'

export const REGEX={
    PASSWORD_RULE,
    
}

export const MESSAGE ={
    PASSWORD_MESSAGE
}