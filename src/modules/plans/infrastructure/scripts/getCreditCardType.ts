'use strict'


const cards: Record<string, any> = {
    '001': /^(?:4[0-9]{12})(?:[0-9]{3,6})?$/, //visa
    '002': /^5[1-5][0-9]{2}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/, // /^[25][1-7][0-9]{14}$/; //mastercard
    '003': /^3[47][0-9]{13}$/, //amex
    '004': /^6(?:011|5[0-9][0-9])[0-9]{12,15}$/, //discover
    '007': /^(?:2131|1800|35\d{3})\d{11}$/ //jcb
}


export default (data: { cardNumber: string }) => {
    const cleanedCardNumber = data.cardNumber.replace(/\s+/g, '').replace(/-/g, '')
    const keyCards = Object.keys(cards)
    const cardType = keyCards.find(element => cards[element].test(cleanedCardNumber))
    if(!cardType) {
        return '000'
    }
    return cardType
}